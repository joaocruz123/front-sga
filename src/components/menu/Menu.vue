<template>
  <q-scroll-area class="fit">
    <q-list padding class="rounded-borders text-menu">
      <q-item
        clickable
        v-ripple
        :active="selected_menu === 'home'"
        @click="setMenuActive('home')"
        active-class="active-link"
        to="/"
      >
        <q-item-section avatar>
          <q-icon name="home" />
        </q-item-section>

        <q-item-section>Inico</q-item-section>
      </q-item>

      <q-expansion-item icon="person" label="Secretaria">
        <q-item
          class="item-submenu"
          clickable
          v-ripple
          :active="selected_menu === 'membros'"
          @click="setMenuActive('membros')"
          active-class="my-menu-link"
          to="membros"
        >
          <q-item-section>Membros</q-item-section>
        </q-item>
        <q-item
          class="item-submenu"
          clickable
          v-ripple
          :active="selected_menu === 'cargos'"
          @click="setMenuActive('cargos')"
          active-class="my-menu-link"
        >
          <q-item-section>Cargos</q-item-section>
        </q-item>
        <q-item
          class="item-submenu"
          clickable
          v-ripple
          :active="selected_menu === 'nomeacoes'"
          @click="setMenuActive('nomeacoes')"
          active-class="my-menu-link"
        >
          <q-item-section>Nomeações</q-item-section>
        </q-item>
        <q-item
          class="item-submenu"
          clickable
          v-ripple
          :active="selected_menu === 'carteira'"
          @click="setMenuActive('carteira')"
          active-class="my-menu-link"
        >
          <q-item-section>Carteira</q-item-section>
        </q-item>
      </q-expansion-item>

      <q-item
        clickable
        v-ripple
        :active="selected_menu === 'agenda'"
        @click="setMenuActive('agenda')"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="book" />
        </q-item-section>

        <q-item-section>Agenda</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="selected_menu === 'financeiro'"
        @click="setMenuActive('financeiro')"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="attach_money" />
        </q-item-section>

        <q-item-section>Financeiro</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="selected_menu === 'celulas'"
        @click="setMenuActive('celulas')"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="group" />
        </q-item-section>

        <q-item-section>Celulas</q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item
        clickable
        v-ripple
        :active="selected_menu === 'configuracao'"
        @click="setMenuActive('configuracao')"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>

        <q-item-section>Settings</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="selected_menu === 'ajuda'"
        @click="setMenuActive('ajuda')"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="help" />
        </q-item-section>

        <q-item-section>Help</q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "Menu",
  data() {
    return {};
  },
  computed: {
    ...mapState("navigation", ["selected_menu"]),
  },
  methods: {
    ...mapActions("navigation", ["setMenuActive"]),
  },
};
</script>

<style>
.my-menu-link {
  color: #fff;
  background: #d66f16;
}
</style>
