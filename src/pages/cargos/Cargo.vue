<template>
  <div class="q-pa-xl">
    <div class="row q-col-gutter-md">
      <div class="col-xs-12 col-sm-12">
        <div class="text-h6 h6 text-primary">Cargo</div>
      </div>

      <div class="col-xs-12 col-sm-4">
        <q-input type="text" v-model="nome" label="Nome" required />
      </div>

      <div class="col-xs-12 col-sm-4">
        <q-input type="text" v-model="descricao" label="Descrição" required />
      </div>

      <div class="col-xs-12 col-sm-4">
        <q-select v-model="ativo" :options="options_status" label="Status" required />
      </div>
    </div>

    <div class="row q-col-gutter-md justify-end q-mt-md">
      <div class="col-xs-12 col-sm-3">
        <q-btn
          color="primary"
          class="full-width"
          label="save"
          icon="save"
          @click="saveData()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "./../../plugins/axios";
import { api, via } from "boot/axios";

import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      id_cargo: "",
      nome: "",
      descricao: "",
      ativo: "",
      options_status: [
        {
          label: "Ativo",
          value: 1,
        },
        {
          label: "Inativo",
          value: 0,
        },
      ],
    };
  },
  computed: {
    ...mapState("cargos", ["cargos", "cargoId"]),
  },
  methods: {
    ...mapActions("cargos", [
      "saveCargo",
      "editCargo",
      "getMembroDetails",
      "getCargoId",
    ]),
    ...mapActions("navigation", ["setNamePage", "setBackPage", "setCreateData"]),

    fetchData() {
      this.getCargoId(this.id_membro)
        .then(() => {
          this.nome = this.cargoId.nome;
          this.descricao = this.cargoId.descricao;
          this.ativo = this.cargoId.ativo;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    saveData() {
      let data = {
        nome: this.nome,
        descricao: this.descricao,
        ativo: this.ativo,
      };

      if (this.id_cargo != 0) {
        this.editCargo([this.id_membro, data]);
      } else {
        this.saveCargo(data);
      }
    },
  },

  created() {
    this.id_cargo = this.$route.params.id;
    if (this.id_cargo != 0) {
      this.fetchData();
    }

    this.setNamePage("Cadastrar Cargo");
    this.setBackPage("cargos");
    this.setCreateData(true);
  },
};
</script>

<style scoped>
.q-item__section--thumbnail img {
  width: 100px;
  height: 100%;
}
</style>
