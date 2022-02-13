<template>
  <q-page>
    <div v-if="isLoading">
      <Skeleton></Skeleton>
    </div>

    <div v-else>
      <div class="q-pa-lg">
        <div class="text-h4 h4 text-primary q-mb-lg">
          <q-icon name="assignment_ind" class="q-mb-sm" /> Membros
        </div>

        <div v-if="membros && !membros.length > 0">
          <q-banner inline-actions rounded class="bg-primary text-white">
            Não há membros cadastrados para serem exibidos.

            <!--<template v-slot:action>
              <q-btn flat label="Cadastrar" />
            </template>-->
          </q-banner>
        </div>
        <div v-else>
          <q-table
            :data="membros"
            :columns="columns"
            row-key="name"
            bordered
            color="primary"
            card-class="bg-grey-11 text-black"
          >
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
                <q-th auto-width />
              </q-tr>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  <div v-if="col.name === 'avatar'">
                    <q-avatar>
                      <img
                        :src="`http://localhost/uploads/avatars/${col.value}`"
                      />
                    </q-avatar>
                  </div>
                  <div v-if="col.name === 'afastado'">
                    <div v-if="col.value === 'não'">
                      <q-badge color="red"> Não </q-badge>
                    </div>
                    <div v-if="col.value === 'null'">
                      <q-badge color="red"> Não </q-badge>
                    </div>
                    <div v-if="col.value === 'sim'">
                      <q-badge color="green"> Sim </q-badge>
                    </div>
                  </div>
                  <div v-if="col.name !== 'avatar' && col.name !== 'afastado'">
                    {{ col.value }}
                  </div>
                </q-td>
                <q-td auto-width>
                  <q-btn
                    flat
                    round
                    color="secondary"
                    icon="edit"
                    @click="
                      $router.push({
                        name: 'membro',
                        params: { id: props.row.id },
                      })
                    "
                  />
                  <q-btn
                    flat
                    round
                    color="negative"
                    icon="delete_outline"
                    @click="confirmRemove(props.row.id)"
                  />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
        <q-dialog
          v-model="confirm_remove"
          persistent
          transition-show="flip-down"
          transition-hide="flip-up"
        >
          <q-card>
            <q-bar>
              <q-space />
              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip content-class="bg-white text-primary"
                  >Close</q-tooltip
                >
              </q-btn>
            </q-bar>

            <q-card-section class="row items-center">
              <span class="q-ml-sm"
                >Deseja Remover o item PERMANENTEMENTE?</span
              >
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                label="Cancel"
                color="accent"
                @click="confirm_remove = false"
              />
              <q-btn label="Remover" color="negative" @click="removeItem()" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>

    <q-dialog v-model="actions" :position="'bottom'">
      <q-card style="width: 350px; padding: 20px">
        <q-btn
          class="full-width"
          color="primary"
          style="margin-bottom: 10px"
          label="Editar"
          icon="edit"
          @click="$router.push({ name: 'membro', params: { id: action_id } })"
        />
        <q-btn
          class="full-width"
          color="negative"
          label="Excluir"
          icon="delete"
          @click="confirmRemove(action_id)"
        />
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="confirm_remove"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card>
        <q-bar>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="row items-center">
          <span class="q-ml-sm">Deseja Remover o membro PERMANENTEMENTE?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            label="Cancel"
            outline
            color="grey-7"
            @click="confirm_remove = false"
          />
          <q-btn label="Remover" color="negative" @click="removeItem()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        round
        color="primary"
        icon="add"
        @click="$router.push({ name: 'membro', params: { id: 0 } })"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Skeleton from "./../../components/skeleton/SkeletonMembros";
export default {
  name: "Membros",
  data() {
    return {
      actions: false,
      filter: "",
      columns: [
        {
          name: "avatar",
          required: true,
          label: "",
          align: "left",
          field: "avatar",
          sortable: true,
        },
        {
          name: "nome",
          align: "left",
          label: "Nome",
          field: (row) => row.nome,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "cpf",
          align: "left",
          label: "CPF",
          field: (row) => row.cpf,
          format: (val) => `${val}`,
          sortable: false,
        },
        {
          name: "afastado",
          align: "left",
          label: "Afastado?",
          field: (row) => row.afastado,
          format: (val) => `${val}`,
          sortable: true,
        },
      ],
      action_id: "",
      confirm_remove: false,
    };
  },
  components: {
    Skeleton,
  },
  computed: {
    ...mapState("membros", ["membros", "isLoading"]),
  },
  methods: {
    ...mapActions("membros", ["getMembros", "deleteMembros"]),
    ...mapActions("navigation", ["setNamePage", "setCreateData"]),

    confirmRemove(id) {
      this.action_id = id;
      this.confirm_remove = true;
    },

    removeItem() {
      this.deleteMembros(this.action_id)
        .then(() => {
          this.getMembros();
        })
        .catch((e) => {
          console.log(e);
        });
      this.confirm_remove = false;
      this.actions = false;
    },

    open(id) {
      this.action_id = id;
      this.actions = true;
    },
  },
  created() {
    this.setNamePage("Membros");
    this.setCreateData(false);
    this.getMembros();
  },
};
</script>

<style scoped>
.q-table__container {
  background: none;
}

.q-item {
  background: #eeeeee;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 2px rgb(0 0 0 / 10%);
}
</style>
