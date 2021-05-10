import axios from './../../plugins/axios'
import {Loading} from 'quasar'

import {
    GET_DATA,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_ERROR
} from '../mutation_type'

export default {
    namespaced: true,
    state: {
        isAuthenticated: false,
        access_user:{
            id: null,
            name: null,
            email: null,
            token: null
        },
        error: ''
    },
    actions: {
        login(context, params) {
            const obj = JSON.parse(localStorage.access_user)
            let token = obj.token
            
            let email = params[0]
            let password = params[1]

            Loading.show()
            axios.request('post', `/login?email=${email}&password=${password}`, '', { Authorization: 'Bearer ' + token })
                .then(response => {
                    context.commit('LOGIN_SUCCESS', response.data)
                    Loading.hide()
                    this.$router.push({path: 'home'})
                }).catch(error => {
                    context.commit('LOGIN_ERROR', response.data)
                    Loading.hide()
                })
        },
        logout(context) {
            const obj = JSON.parse(localStorage.access_user)
            let token = obj.token

            Loading.show()
            axios.request('post', `/logout`, '', { Authorization: 'Bearer ' + token })
                .then(response => {
                    context.commit('LOGOUT_SUCCESS', response.data)
                    Loading.hide()
                    this.$router.push({path: 'login'})
                }).catch(error => {
                    this.error = error
                })
        },
    },
    getters:{
        isAuthenticated: state => {
            return state.isAuthenticated
        },
        access_user: state => {
            return state.access_user
        },
    },
    mutations: {
        [LOGIN_SUCCESS](state, payload) {
            state.access_user = payload.result
            localStorage.access_user = JSON.stringify(payload.result)
            state.isAuthenticated = true
        },
        [LOGIN_ERROR](state, payload) {
            state.error = payload.error
        },
        [GET_DATA](state,payload){
            state.isLoading = payload
        },
        [LOGOUT_SUCCESS](state,payload){
            state.access_user = {}
            localStorage.access_user = ""
            state.isAuthenticated = false
        }
    }
}