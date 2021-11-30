<template>
  <div class="tabsradius">
    <q-tabs class="bg-primary text-white shadow-2">
      <q-tab name="home" icon="home" @click="alterTab('home')" />
      <q-tab name="calendar" icon="today" @click="alterTab('calendar')" />
      <q-tab name="search" icon="search" @click="alterTab('search')" />
      <q-tab name="favorite" icon="favorite" @click="alterTab('favorite')" />
    </q-tabs>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "FooterHome",
  data() {
    return {};
  },
  methods: {
    ...mapActions("navigation", ["alterTab"]),
  },
};
</script>

<style scoped>
.tabsradius {
  border-radius: 60px;
}
</style>
