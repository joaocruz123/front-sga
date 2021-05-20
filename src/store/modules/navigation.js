import axios from './../../plugins/axios'
import {Loading} from 'quasar'
import { Notify } from 'quasar'

import {
    SET_DATA_TAB,
    SET_DATA_MENU,
    SET_DATA_NAME
} from '../mutation_type'

export default {
    namespaced: true,
    state: {
        isLoading: false,
        selected_tab: 'home',
        selected_menu: '',
        name_page: 'Teste'
    },
    actions: {
        alterTab(context, tab) {
            context.commit('SET_DATA_TAB', tab)
        },
        setMenuActive(context, menu){
            context.commit('SET_DATA_MENU', menu)
        },
        setNamePage(context, name){
            context.commit('SET_DATA_NAME', name)
        }
    },
    mutations: {
        [SET_DATA_TAB](state, payload) {
            state.selected_tab = payload
        },
        [SET_DATA_MENU](state, payload) {
            state.selected_menu = payload
        },
        [SET_DATA_NAME](state, payload) {
            state.name_page = payload
        }
    }
}