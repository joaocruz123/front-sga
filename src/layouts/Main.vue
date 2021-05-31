<template>
<q-layout view="lHh Lpr lFf">
    <q-header class="bg-primary text-white">
        <q-toolbar>
            <span v-if="!create">
                <q-btn dense flat round icon="menu" @click="left = !left" />
            </span>
            <span v-else>
                <q-btn dense flat round icon="arrow_back" @click="$router.push({ name: back })"/>
            </span>

            <q-toolbar-title>
                {{name_page}}
            </q-toolbar-title>

        </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
        <Menu></Menu>
    </q-drawer>

    <q-page-container>
        <router-view />
    </q-page-container>

    <q-dialog v-model="exit_app" persistent>
        <q-card>
            <q-card-section class="row items-center">
                <span class="q-ml-sm">Essa ação resultará no logoff da sessão. Deseja continuar?</span>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cancelar" color="primary" v-close-popup />
                <q-btn flat label="Sair" @click="logout()" color="negative" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</q-layout>
</template>

<script>
import {
    mapActions,
    mapState
} from 'vuex'
import Menu from './../components/menu/Menu'
import FooterMain from './../components/menu/FooterMain'
let unsubscribe;

export default {
    name: 'Main',
    data() {
        return {
            user: '',
            left: false,
            exit_app: false
        }
    },
    components: {
        Menu,
        FooterMain
    },
    computed: {
        ...mapState("navigation", ["name_page", "back", "create"])
    },
    methods: {
        ...mapActions("auth", ["logout"]),
    },
    mounted() {
        const obj = JSON.parse(localStorage.access_user);
        this.user = obj.user_name;

        unsubscribe = this.$store.subscribe(mutation => {
            switch (mutation.type) {
                case "auth/LOGOUT_SUCCESS":
                    localStorage.removeItem("access_user");
                    localStorage.removeItem("isAuthenticated");
                    break;
            }
        });
    }
}
</script>

<style scoped>
.header-home {
    height: 170px
}

.footer-header {
    border-radius: 25px 25px 0 0;
    background: #fff;
    height: 25px;
}
</style>
