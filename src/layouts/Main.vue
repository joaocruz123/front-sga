<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white header-home">
      <q-toolbar>
          <!-- <q-btn flat @click="drawer = !drawer" round dense icon="menu" /> -->

        <q-toolbar-title> Sistema de Gestão Administrativa </q-toolbar-title>

        <q-btn dense flat round icon="notifications" />
        <q-btn dense flat round icon="share" />
        <q-btn dense flat round icon="exit_to_app" @click="exit_app = true" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="!drawer || miniState"
      @click.capture="drawerClick"
      :width="260"
      :breakpoint="500"
      bordered
      class="primary"
    >
      <Menu />

      <div class="q-mini-drawer-hide absolute" style="bottom: 15px; right: -17px">
        <q-btn
          dense
          round
          unelevated
          color="primary"
          icon="chevron_left"
          @click="miniState = true"
        />
      </div>
    </q-drawer>

    <q-page-container>
        <router-view />
    </q-page-container>

    <q-dialog v-model="exit_app" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm"
            >Essa ação resultará no logoff da sessão. Deseja continuar?</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            flat
            label="Sair"
            @click="logout()"
            color="negative"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Menu from "./../components/menu/Menu";
import FooterHome from "./../components/menu/FooterHome";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
let unsubscribe;

export default {
  name: "Main",
  data() {
    return {
      path: "",
      user: "",
      left: false,
      exit_app: false,
      drawer: false,
      miniState: false,
    };
  },
  components: {
    Menu,
    FooterHome,
  },
  created() {
    this.setNamePage("Dashboard");
  },
  computed: {
    ...mapState("navigation", ["name_page"]),
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    ...mapActions("navigation", ["setNamePage"]),

     drawerClick(e) {
      if (this.miniState) {
        this.miniState = false;
        e.stopPropagation();
      }
    },
  },
  mounted() {
    const obj = JSON.parse(localStorage.access_user);
    this.user = obj.user_name;

    unsubscribe = this.$store.subscribe((mutation) => {
      switch (mutation.type) {
        case "auth/LOGOUT_SUCCESS":
          localStorage.removeItem("access_user");
          localStorage.removeItem("isAuthenticated");
          break;
      }
    });
  },
};
</script>

<style>
#view {
  padding-left: 350px;
}
#view.collapsed {
  padding-left: 50px;
}

.sidebar.v-sidebar-menu .vsm-arrow:after {
  content: "\f07e";
  font-family: FontAwesome;
}
.sidebar.v-sidebar-menu .collapse-btn:after {
  content: "\f07e";
  font-family: FontAwesome;
}
</style>