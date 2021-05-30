<template>
<q-page>
    <div class="q-ma-md">
        <p class="subtitle-head">Lista de membros/congregados cadastrados na igreja</p>
    </div>

    <div v-if="isLoading">
        <Skeleton></Skeleton>
    </div>

    <q-table :data="membros" :columns="columns" row-key="name" hide-bottom hide-header v-else>
        <!-- <template v-slot:top>
            <div class="col" />
            <q-btn color="secondary" icon="add" label="new" @click="$router.push({ name: 'membro', params: { id: 0 } })" />
        </template> -->

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
                    <span v-if="col.name === 'avatar'">
                        <q-avatar>
                            <img :src="`http://localhost/uploads/avatars/${col.value}`">
                        </q-avatar>
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
                <!-- <q-td auto-width>
                    <q-btn flat round color="accent" icon="edit" @click="$router.push({ name: 'membro', params: { id: props.row.id } })" />
                    <q-btn flat round color="negative" icon="delete_outline" @click="confirmRemove(props.row.id)" />
                </q-td> -->
            </q-tr>
        </template>

    </q-table>

    <q-dialog v-model="actions" :position="'bottom'">
        <q-card style="width: 350px; padding: 20px;">
            <q-btn outline class="full-width" color="primary" style="margin-bottom: 10px;" label="Editar" icon="edit" @click="$router.push({ name: 'membro', params: { id: action_id } })" />
            <q-btn outline class="full-width" style="color: red" label="Excluir" icon="delete" @click="confirmRemove(action_id)" />
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
        <q-btn round color="secondary" icon="add" />
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
        ...mapActions("navigation", ["setNamePage"]),

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
        this.getMembros()
    }
}
</script>

<style scoped>
.q-table__container {
    background: none;
}
</style>
