<template>
  <div class="q-pa-xl">
    <div class="text-h4 h4 text-primary q-mb-xl">
      <q-icon name="assignment_ind" class="q-mb-sm" /> Novo Membro
    </div>
    <div class="row q-col-gutter-md">
      <div class="col-xs-12 col-sm-12">
        <div class="text-h6 h6 text-primary">Dados Pessoais</div>
      </div>

      <div class="col-xs-12 col-sm-6">
        <q-input
          type="text"
          v-model="nome"
          v-model.trim="$v.nome.$model"
          :error="$v.nome.$error"
          label="Nome Completo"
          required
        />
        <div class="text-red required-alert" v-if="$v.telefone.$error">
          O campo nome é obrigatório.
        </div>
      </div>

      <div class="col-xs-12 col-sm-6">
        <q-input
          type="text"
          v-model="cpf"
          label="CPF"
          required
          maxlenth="14"
          v-model.trim="$v.cpf.$model"
          :error="$v.cpf.$error"
          v-mask="'###.###.###-##'"
        />
        <div class="text-red required-alert" v-if="$v.telefone.$error">
          O campo deve conter 12 digitos.
        </div>
      </div>

      <div class="col-xs-12 col-sm-4">
        <q-select v-model="sexo" :options="options_sexo" label="Sexo" />
      </div>

      <div class="col-xs-12 col-sm-4">
        <q-input
          type="text"
          v-model="telefone"
          label="Telefone"
          v-model.trim="$v.telefone.$model"
          :error="$v.telefone.$error"
          v-mask="'(##) #####-####'"
        />
        <div class="text-red required-alert" v-if="$v.telefone.$error">
          O campo deve conter 10 (fixo) ou 11 (celular) digitos.
        </div>
      </div>

      <div class="col-xs-12 col-sm-4">
        <q-input
          type="text"
          v-model="email"
          label="Email"
          v-model.trim="$v.email.$model"
          :error="$v.email.error"
        />
        <div class="text-red required-alert" v-if="$v.email.error">
          Não é um e-mail válido
        </div>
      </div>

      <div class="col-xs-12 col-sm-6">
        <q-input
          v-model="data_nascimento"
          mask="date"
          label="Data de Nascimento"
        >
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="data_nascimento"
                  @input="() => $refs.qDateProxy.hide()"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div class="col-xs-12 col-sm-6">
        <q-select
          v-model="estado_civil"
          :options="options_estado_civil"
          label="Estado Civil"
        />
      </div>

      <div class="col-xs-12 col-sm-12">
        <div class="text-h6 h6 text-primary">Dados de Endereço</div>
      </div>

      <div class="col-xs-12 col-sm-4">
        <q-input type="number" v-model="cep" label="Cep" @blur="searchCep()" />
      </div>

      <div class="col-xs-12 col-sm-8">
        <q-input type="text" v-model="endereco" label="Endereco" />
      </div>

      <div class="col-xs-12 col-sm-6">
        <q-input type="text" v-model="bairro" label="Bairro" />
      </div>

      <div class="col-xs-12 col-sm-6">
        <q-input type="number" v-model="numero" label="Numero" />
      </div>

      <div class="col-xs-12 col-sm-6">
        <q-input type="text" v-model="complemento" label="Complemento" />
      </div>

      <div class="col-xs-12 col-sm-6">
        <q-input type="text" v-model="cidade" label="Bairro" />
      </div>

      <div class="col-xs-12 col-sm-6">
        <q-input type="text" v-model="estado" label="Estado" />
      </div>

      <div class="col-xs-12 col-sm-12">
        <div class="text-h6 h6 text-primary">Dados Profissionais</div>
      </div>

      <div class="col-xs-12 col-sm-6">
        <q-input type="text" v-model="profissao" label="Profissão" />
      </div>

      <div class="col-xs-12 col-sm-6">
        <q-input
          type="text"
          v-model="endereco_trabalho"
          label="Endereço do Trabalho"
        />
      </div>

      <div class="col-xs-12 col-sm-12">
        <div class="text-h6 h6 text-primary">Outros Dados</div>
      </div>

      <div class="col-xs-12 col-sm-6">
        <q-select
          v-model="atuacao"
          :options="options_atuacao"
          label="Atuação na Igreja"
        />
      </div>

      <div class="col-xs-12 col-sm-6">
        <q-input v-model="data_conversao" mask="date" label="Data de Conversão">
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                ref="qDateProxy"
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="data_conversao"
                  @input="() => $refs.qDateProxy.hide()"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div class="col-xs-12 col-sm-6">
        <q-checkbox
          v-model="batizado"
          color="primary"
          label="O membro é batizado?"
          true-value="sim"
          false-value="não"
        />
      </div>

      <div class="col-xs-12 col-sm-6">
        <q-checkbox
          v-model="afastado"
          color="primary"
          label="O membro está afastado?"
          true-value="sim"
          false-value="não"
        />
      </div>

      <div class="col-xs-12 col-sm-12">
        <div class="text-h6 h6 text-primary">Foto</div>
      </div>

      <span v-if="picture_edit">
        <div class="col-xs-12 col-sm-6">
          <q-list style="mix-width: 100%">
            <q-item clickable v-ripple>
              <q-item-section thumbnail>
                <img
                  :src="`http://localhost/uploads/avatars/${avatar}`"
                  width="150px"
                />
              </q-item-section>
              <q-item-section>
                <q-btn
                  color="negative"
                  label="Remover Imagem"
                  @click="editPicture()"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </span>

      <div class="col-xs-12 col-sm-6" v-else>
        <q-input
          @input="
            (val) => {
              avatar = val[0];
            }
          "
          type="file"
          hint="*jpg/jpeg"
        />
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
import {
  required,
  minLength,
  between,
  maxLength,
  email,
} from "vuelidate/lib/validators";
import { api, via } from "boot/axios";

import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      id_membro: "",
      nome: "",
      cpf: "",
      sexo: "",
      telefone: "",
      cep: "",
      bairro: "",
      endereco: "",
      numero: "",
      complemento: "",
      cidade: "",
      estado: "",
      email: "",
      data_nascimento: "",
      estado_civil: "",
      profissao: "",
      endereco_trabalho: "",
      atuacao: "",
      avatar: null,
      picture: null,
      data_conversao: "",
      batizado: "não",
      afastado: "não",
      options_atuacao: ["Membro", "Congregado"],
      options_sexo: ["Masculino", "Feminino"],
      options_estado_civil: [
        "Solteiro(a)",
        "Casado(a)",
        "Divorciado(a)",
        "Viúvo(a)",
      ],
      options_tipo_casamento: ["Civil", "Religioso", "Civil e Religioso"],
      options_sacramentos: ["Batismo", "Primeira Eucaristia", "Outros"],
      picture_edit: false,
    };
  },
  validations: {
    nome: {
      required,
    },
    cpf: {
      required,
      minLength: minLength(14),
      maxLength: maxLength(14),
    },
    sexo: {
      required,
    },
    telefone: {
      required,
      minLength: minLength(14),
      maxLength: maxLength(15),
    },
    email: {
      required,
      email,
    },
  },
  computed: {
    ...mapState("membros", ["membros", "membroId"]),
  },
  methods: {
    ...mapActions("membros", [
      "saveMembro",
      "editMembro",
      "getMembroDetails",
      "getMembroId",
    ]),
    ...mapActions("navigation", [
      "setNamePage",
      "setBackPage",
      "setCreateData",
    ]),

    searchCep() {
      if (this.cep.length === 8) {
        via
          .get(`/${this.cep}/json/`)
          .then((response) => {
            this.endereco = response.data.logradouro;
            this.bairro = response.data.bairro;
            this.cidade = response.data.localidade;
            this.estado = response.data.uf;
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },

    disableField() {
      if (this.estado_civil === "Solteiro(a)") {
        return true;
      } else return false;
    },
    fetchData() {
      this.getMembroId(this.id_membro)
        .then(() => {
          this.nome = this.membroId.nome;
          this.cpf = this.membroId.cpf;
          this.sexo = this.membroId.sexo;
          this.telefone = this.membroId.telefone;
          this.email = this.membroId.email;
          this.cep = this.membroId.cep;
          this.numero = this.membroId.numero;
          this.bairro = this.membroId.bairro;
          this.complemento = this.membroId.complemento;
          this.endereco = this.membroId.endereco;
          this.estado = this.membroId.estado;
          this.cidade = this.membroId.cidade;
          this.data_nascimento = this.membroId.data_nascimento;
          this.estado_civil = this.membroId.estado_civil;
          this.profissao = this.membroId.profissao;
          this.endereco_trabalho = this.membroId.endereco_trabalho;
          this.atuacao = this.membroId.atuacao;
          this.avatar = this.membroId.avatar;
          this.data_conversao = this.membroId.data_conversao;
          this.batizado = this.membroId.batizado;
          this.afastado = this.membroId.afastado;
          this.picture_edit = true;
          // this.picture = this.membroId.avatar
        })
        .catch((e) => {
          console.log(e);
        });
    },
    saveData() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        window.scrollTo(0, 0);
        this.validationError();
      } else {
        let data = {
          nome: this.nome,
          cpf: this.cpf,
          sexo: this.sexo,
          telefone: this.telefone,
          bairro: this.bairro,
          cep: this.cep,
          numero: this.numero,
          complemento: this.complemento,
          endereco: this.endereco,
          estado: this.estado,
          cidade: this.cidade,
          email: this.email,
          data_nascimento: this.data_nascimento,
          estado_civil: this.estado_civil,
          profissao: this.profissao,
          endereco_trabalho: this.endereco_trabalho,
          atuacao: this.atuacao,
          avatar: this.avatar,
          data_conversao: this.data_conversao,
          batizado: this.batizado,
          afastado: this.afastado,
        };

        var form_data = new FormData();

        for (var key in data) {
          if (data[key] === null) {
            form_data.append(key, "");
          } else {
            form_data.append(key, data[key]);
          }
        }

        if (this.id_membro != 0) {
          this.editMembro([this.id_membro, form_data]);
        } else {
          this.saveMembro(form_data);
        }
      }
    },

    editPicture() {
      this.picture_edit = false;
    },

    validationError() {
      this.$q.notify({
        message: "Preencha todos os campos obrigatórios.",
        type: "negative",
      });
    },
  },

  created() {
    this.id_membro = this.$route.params.id;
    if (this.id_membro > 0) {
      this.fetchData();
      this.picture_edit = true;
    }

    this.setNamePage("Cadastrar Membro");
    this.setBackPage("membros");
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
