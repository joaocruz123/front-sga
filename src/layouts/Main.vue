<template>
<q-layout view="lHh Lpr lFf">
    <q-header class="bg-primary text-white" style="height: 150px">
        <q-toolbar>
            <q-btn dense flat round icon="menu" @click="left = !left" />

            <q-toolbar-title>
            </q-toolbar-title>

            <q-btn dense flat round icon="notifications" />
            <q-btn dense flat round icon="share" />
            <q-btn dense flat round icon="exit_to_app" @click="exit_app = true" />
        </q-toolbar>

        <div class="box-welcome">
            <p>Seja Bem-vindo!</p>
            <p class="user-name">{{user}}</p>
        </div>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" bordered>
        <!-- drawer content -->
    </q-drawer>

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

    <q-page-container>
        <router-view />
    </q-page-container>
</q-layout>
</template>

<script>
import {mapActions} from 'vuex'

let unsubscribe;

export default {
    name: 'Main',
    data() {
        return {
            user: "",
            left: false,
            exit_app: false
        }
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
    },
}
</script>
