<template>
<q-layout view="lHh Lpr lFf">
    <q-header class="bg-primary text-white">
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

            <q-img src="~assets/img/avatar_sga.png" class="img-user" />
        </div>
    </q-header> 

    <q-drawer show-if-above v-model="left" side="left" bordered>
        <Menu></Menu>
    </q-drawer>

    <q-page-container>
        <router-view />
    </q-page-container>
    
    <q-footer>
        <FooterHome></FooterHome>
    </q-footer>
    
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
import {mapActions} from 'vuex'
import Menu from './../components/menu/Menu'
import FooterHome from './../components/menu/FooterHome'
let unsubscribe;

export default {
    name: 'Main',
    data() {
        return {
            path: '',
            user: '',
            left: false,
            exit_app: false
        }
    },
    components:{
        Menu,
        FooterHome
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
<style scoped>
.header-home{
    height: 170px
}
.footer-header{
  border-radius: 25px 25px 0 0;
  background: #fff;
  height: 25px;
}
main{
  background: #fff;
}
</style>