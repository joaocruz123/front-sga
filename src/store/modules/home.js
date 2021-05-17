import axios from './../../plugins/axios'
import {Loading} from 'quasar'
import { Notify } from 'quasar'

import {
    GET_DATA,
} from '../mutation_type'

export default {
    namespaced: true,
    state: {
        isLoading: false,
        selected_tab:'home'
    },
    actions: {
        alterTab(context, tab) {
            context.commit('GET_DATA', tab)
        }
    },
    mutations: {
        [GET_DATA](state, payload) {
            state.selected_tab = payload
        },
    }
}