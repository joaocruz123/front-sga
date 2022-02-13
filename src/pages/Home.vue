<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
        <div class="col-xs-12 col-sm-3">
          <q-card bordered class="card">
            <q-card-section>
              <div class="row">
                <div class="col-xs-12 col-sm-8">
                  <div class="text-subtitle3">Membros</div>
                  <p class="contador">195</p>
                </div>
                <div class="col-xs-12 col-sm-4 img">
                  <q-img
                    src="~assets/img/icons/icon-membros.png"
                    width="40px"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-3">
          <q-card bordered class="card">
            <q-card-section>
              <div class="row">
                <div class="col-xs-12 col-sm-8">
                  <div class="text-subtitle3">Pastores</div>
                  <p class="contador">20</p>
                </div>
                <div class="col-xs-12 col-sm-4 img">
                  <q-img
                    src="~assets/img/icons/icon-pastores.png"
                    width="40px"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-3">
          <q-card bordered class="card">
            <q-card-section>
              <div class="row">
                <div class="col-xs-12 col-sm-8">
                  <div class="text-subtitle3">Batizados</div>
                  <p class="contador">49</p>
                </div>
                <div class="col-xs-12 col-sm-4 img">
                  <q-img
                    src="~assets/img/icons/icon-batizado.png"
                    width="40px"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-3">
          <q-card bordered class="card">
            <q-card-section>
              <div class="row">
                <div class="col-xs-12 col-sm-8">
                  <div class="text-subtitle3">Celulas</div>
                  <p class="contador">9</p>
                </div>
                <div class="col-xs-12 col-sm-4 img">
                  <q-img
                    src="~assets/img/icons/icon-celulas.png"
                    width="40px"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Dashboard from "./home/Dashboard.vue";

export default {
  components: {
    Dashboard,
  },
  name: "Home",
  data() {
    return {};
  },
  computed: {
    ...mapState("navigation", ["selected_tab"]),
  },
  methods: {
    ...mapActions("navigation", ["alterTab"]),
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: row;
}

.img {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
