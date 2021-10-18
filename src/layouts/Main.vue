<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <span v-if="!create">
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </span>
        <span v-else>
          <q-btn
            dense
            flat
            round
            icon="arrow_back"
            @click="$router.push({ name: back })"
          />
        </span>

        <q-toolbar-title>
          {{ name_page }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="!drawer || miniState"
      @click.capture="drawerClick"
      :width="300"
      :breakpoint="500"
      bordered
      class="primary"
    >
      <Menu />

      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
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
          <q-btn flat label="Sair" @click="logout()" color="negative" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Menu from "./../components/menu/Menu";
import FooterMain from "./../components/menu/FooterMain";
import { ref } from "vue";
let unsubscribe;

export default {
  name: "Main",
  data() {
    return {
      user: "",
      left: false,
      exit_app: false,
      drawer: false,
      miniState: false,
    };
  },
  components: {
    Menu,
    FooterMain,
  },
  computed: {
    ...mapState("navigation", ["name_page", "back", "create"]),
  },
  methods: {
    ...mapActions("auth", ["logout"]),

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

<style scoped>
.header-home {
  height: 170px;
}

.footer-header {
  border-radius: 25px 25px 0 0;
  background: #fff;
  height: 25px;
}
</style>
