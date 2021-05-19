<template>
<q-page>
    <div v-if="isLoading">
        <Skeleton></Skeleton>
    </div>

    <q-list v-else>
        <div v-for="membro in membros" :key="membro.id">
            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-avatar>
                        <img :src="`http://localhost/uploads/avatars/${membro.avatar}`">
                    </q-avatar>
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

            <q-separator inset="item" />
        </div>
    </q-list>

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
import Skeleton from './Skeleton'
export default {
    name: 'Membros',
    data() {
        return {
            filter: '',
            columns: [{
                    name: 'id',
                    required: true,
                    label: '#',
                    align: 'left',
                    field: 'id',
                    sortable: true,
                },
                {
                    name: 'nome',
                    align: 'left',
                    label: 'nome',
                    field: row => row.nome,
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
    },
    created() {
        this.setNamePage('Membros')
        this.getMembros()
    }
}
</script>
