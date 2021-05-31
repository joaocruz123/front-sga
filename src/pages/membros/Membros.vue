<template>
<q-page>
    <div class="q-ma-md">
        <p class="subtitle-head">Lista de membros/congregados cadastrados na igreja</p>
    </div>

    <div v-if="isLoading">
        <Skeleton></Skeleton>
    </div>

    <!-- <q-table :data="membros" :columns="columns" row-key="name" hide-header v-else>
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
                <q-td v-for="col in props.cols" :key="col.name" :props="props" @click="open(props.row.id)">
                    <span class="membro-avatar" v-if="col.name === 'avatar'">
                        <img :src="`http://localhost/uploads/avatars/${col.value}`">
                    </span>
                    <span v-else>
                        <span v-if="col.name === 'afastado'">
                            <q-badge :color="col.value === 'nao'? 'green' : 'red' ">
                                {{col.value === 'nao' ? 'Ativo' : 'Inatio'}}
                            </q-badge>
                        </span>
                        <span v-else>{{ col.value }}</span>
                    </span>
                </q-td>
            </q-tr>
        </template>

    </q-table> -->

    <q-list v-else>
        <div v-for="membro in membros" :key="membro.id" >
            <q-item clickable v-ripple @click="open(membro.id)">
                <q-item-section avatar>
                    <span class="membro-avatar">
                        <img :src="`http://localhost/uploads/avatars/${membro.avatar}`">
                    </span>
                </q-item-section>

                <q-item-section>
                    <q-item-label lines="1">{{membro.nome}}</q-item-label>
                    <q-item-label caption lines="2">{{membro.email}}</q-item-label>
                    <q-item-label caption lines="2">{{membro.cpf}}</q-item-label>
                </q-item-section>

                <q-item-section side top>
                    <q-badge :color="membro.afastado === 'nao'? 'green' : 'red' ">
                        {{membro.afastado === 'nao' ? 'Ativo' : 'Inatio'}}
                    </q-badge>
                </q-item-section>
            </q-item>
        </div>
    </q-list>
    <q-dialog v-model="actions" :position="'bottom'">
        <q-card style="width: 350px; padding: 20px;">
            <q-btn class="full-width" color="primary" style="margin-bottom: 10px;" label="Editar" icon="edit" @click="$router.push({ name: 'membro', params: { id: action_id } })" />
            <q-btn class="full-width" color="negative" label="Excluir" icon="delete" @click="confirmRemove(action_id)" />
        </q-card>
    </q-dialog>
    <q-dialog v-model="confirm_remove" persistent transition-show="flip-down" transition-hide="flip-up">
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
                <q-btn label="Cancel" outline color="grey-7" @click="confirm_remove = false" />
                <q-btn label="Remover" color="negative" @click="removeItem()" />
            </q-card-actions>
        </q-card>
    </q-dialog>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn round color="secondary" icon="add" @click="$router.push({ name: 'membro', params: { id: 0 } })" />
    </q-page-sticky>

</q-page>
</template>

<script>
import {
    mapActions,
    mapState
} from 'vuex'
import Skeleton from './../../components/skeleton/SkeletonMembros'
export default {
    name: 'Membros',
    data() {
        return {
            actions: false,
            filter: '',
            columns: [{
                    name: 'avatar',
                    required: true,
                    label: '',
                    align: 'left',
                    field: 'avatar',
                    sortable: true,
                },
                {
                    name: 'nome',
                    align: 'left',
                    label: '',
                    field: row => row.nome,
                    format: val => `${val}`,
                    sortable: true
                },
                {
                    name: 'afastado',
                    align: 'left',
                    label: '',
                    field: row => row.afastado,
                    format: val => `${val}`,
                    sortable: true
                }
            ],
            action_id: '',
            confirm_remove: false
        }
    },
    components: {
        Skeleton
    },
    computed: {
        ...mapState("membros", ["membros", "isLoading"])
    },
    methods: {
        ...mapActions("membros", ["getMembros", "deleteMembros"]),
        ...mapActions("navigation", ["setNamePage", "setCreateData"]),

        confirmRemove(id) {
            this.action_id = id
            this.confirm_remove = true
        },

        removeItem() {
            this.deleteMembros(this.action_id)
            this.confirm_remove = false
            this.getMembros()
        },

        open(id) {
            this.action_id = id
            this.actions = true
        }
    },
    created() {
        this.setNamePage('Membros')
        this.setCreateData(false)
        this.getMembros()
    }
}
</script>

<style scoped>
.q-table__container {
    background: none;
}
.q-item{
    background: #eeeeee;
    margin: 10px;
    border-radius: 10px;
}
</style>
