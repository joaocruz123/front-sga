<template>
<div class="q-pa-lg">
    <div class="row q-col-gutter-md">
        <div class="col-xs-12 col-sm-12">
            <div class="text-h6 h6 text-primary">Dados Pessoais</div>
        </div>

        <div class="col-xs-12 col-sm-12">
            <q-input type="text" v-model="nome" label="Nome" required />
        </div>

        <div class="col-xs-12 col-sm-4">
            <q-input type="number" v-model="cpf" label="CPF" required />
        </div>

        <div class="col-xs-12 col-sm-4">
            <q-select v-model="sexo" :options="options_sexo" label="Sexo" />
        </div>

        <div class="col-xs-12 col-sm-4">
            <q-input type="number" v-model="telefone" label="Telefone" />
        </div>

        <div class="col-xs-12 col-sm-4">
            <q-input type="text" v-model="email" label="Email" />
        </div>

        <div class="col-xs-12 col-sm-4">
            <q-input v-model="data_nascimento" mask="date" label="Data de Nascimento">
                <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                            <q-date v-model="data_nascimento" @input="() => $refs.qDateProxy.hide()" />
                        </q-popup-proxy>
                    </q-icon>
                </template>
            </q-input>
        </div>

        <div class="col-xs-12 col-sm-6">
            <q-select v-model="estado_civil" :options="options_estado_civil" label="Estado Civil" />
        </div>

        <div class="col-xs-12 col-sm-12">
            <div class="text-h6 h6 text-primary">Dados de Endereço</div>
        </div>

        <div class="col-xs-12 col-sm-4">
            <q-input type="number" v-model="cep" label="Cep" @blur="searchCep()" />
        </div>

        <div class="col-xs-12 col-sm-6">
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
            <q-input type="text" v-model="endereco_trabalho" label="Endereço do Trabalho" />
        </div>

        <div class="col-xs-12 col-sm-12">
            <div class="text-h6 h6 text-primary">Outros Dados</div>
        </div>

        <div class="col-xs-12 col-sm-6">
            <q-select v-model="atuacao" :options="options_atuacao" label="Atuação na Igreja" />
        </div>

        <div class="col-xs-12 col-sm-4">
            <q-input v-model="data_conversao" mask="date" label="Data de Conversão">
                <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                            <q-date v-model="data_conversao" @input="() => $refs.qDateProxy.hide()" />
                        </q-popup-proxy>
                    </q-icon>
                </template>
            </q-input>
        </div>

        <div class="col-xs-12 col-sm-6">
            <q-checkbox v-model="batizado" color="primary" label="O membro é batizado?" true-value="sim" false-value="não" />
        </div>

        <div class="col-xs-12 col-sm-6">
            <q-checkbox v-model="afastado" color="primary" label="O membro está afastado?" true-value="sim" false-value="não" />
        </div>

        <div class="col-xs-12 col-sm-12">
            <div class="text-h6 h6 text-primary">Foto</div>
        </div>

        <div class="col-xs-12 col-sm-6">
            <q-input @input="val => { avatar = val[0] }" type="file" hint="*jpg/jpeg" />
        </div>
    </div>

    <div class="row q-col-gutter-md justify-end q-mt-md">
        <div class="col-xs-12 col-sm-3">
            <q-btn color="primary" class="full-width" label="save" icon="save" @click="saveData()" />
        </div>
    </div>
</div>
</template>

<script>
import axios from './../../plugins/axios'
import {
    api,
    via
} from 'boot/axios'

import {
    mapActions,
    mapState
} from 'vuex'

export default {
    data() {
        return {
            id_membro: '',
            nome: '',
            cpf: '',
            sexo: '',
            telefone: '',
            cep: '',
            bairro: '',
            endereco: '',
            numero: '',
            complemento: '',
            cidade: '',
            estado: '',
            email: '',
            data_nascimento: '',
            estado_civil: '',
            profissao: '',
            endereco_trabalho: '',
            atuacao: '',
            avatar: null,
            data_conversao: '',
            batizado: 'não',
            afastado: 'não',
            options_atuacao: ['Membro', 'Congregado'],
            options_sexo: ['Masculino', 'Feminino'],
            options_estado_civil: ['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)'],
            options_tipo_casamento: ['Civil', 'Religioso', 'Civil e Religioso'],
            options_sacramentos: ['Batismo', 'Primeira Eucaristia', 'Outros']
        }
    },
    computed: {
        ...mapState("membros", ["membros", "membroId"]),
    },
    methods: {
        ...mapActions("membros", ["saveMembro", "editMembro", "getMembroDetails", "getMembroId"]),
        ...mapActions("navigation", ["setNamePage", "setBackPage", "setCreateData"]),

        searchCep() {
            if (this.cep.length === 8) {
                via.get(`/${ this.cep }/json/`)
                    .then(response => {
                        this.endereco = response.data.logradouro
                        this.bairro = response.data.bairro
                        this.cidade = response.data.localidade
                        this.estado = response.data.uf
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }

        },

        disableField() {
            if (this.estado_civil === "Solteiro(a)") {
                return true
            } else return false
        },
        fetchData() {
            this.getMembroId(this.id_membro).then(() => {
                this.nome = this.membroId.nome
                this.cpf = this.membroId.cpf
                this.sexo = this.membroId.sexo
                this.telefone = this.membroId.telefone
                this.email = this.membroId.email
            }).catch(e => {
                console.log(e)
            });
        },
        saveData() {
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
                afastado: this.afastado
            }

            var form_data = new FormData();

            for (var key in data) {
                form_data.append(key, data[key]);
            }

            if (this.id_membro != 0) {
                this.editMembro([this.id_membro, form_data])
            } else {
                this.saveMembro(form_data)
            }

        }
    },

    created() {
        this.id_membro = this.$route.params.id
        if (this.id_membro != 0) this.fetchData()

        this.setNamePage('Cadastrar Membro')
        this.setBackPage('membros')
        this.setCreateData(true)
    },
}
</script>
