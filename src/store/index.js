import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import navigation from './modules/navigation'
import membros from './modules/membros'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        navigation,
        membros
    },
})