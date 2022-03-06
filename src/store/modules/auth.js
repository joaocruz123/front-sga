import axios from './../../plugins/axios'
import { Loading } from 'quasar'
import { QSpinnerPuff } from 'quasar'
//import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import {
    GET_DATA,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_ERROR
} from '../mutation_type'

export const LoadingParameters = {
    spinner: QSpinnerPuff,
    delay: 0,
    spinnerColor: 'white',
    spinnerSize: 60,
    backgroundColor: 'primary',
    messageColor: 'white'
}

export default {
    namespaced: true,
    state: {
        isAuthenticated: false,
        access_user: {
            id: null,
            name: null,
            email: null,
            token: null
        },
        error: ''
    },
    actions: {
        login(context, params) {
            let email = params[0]
            let password = params[1]

            Loading.show(LoadingParameters)

            // Login Laravel
            axios.request('post', `/login?email=${email}&password=${password}`, '', { Authorization: ' ' })
                .then(response => {
                    context.commit('LOGIN_SUCCESS', response.data)
                    this.$router.push({path: '/'})
                    Loading.hide()
                }).catch(error => {
                    context.commit('LOGIN_ERROR', response.data)
                    Loading.hide()
                })

            // Login Firebase
            // const auth = getAuth();
            // signInWithEmailAndPassword(auth, email, password)
            //     .then(
            //         (user) => {
            //             context.commit('LOGIN_SUCCESS', user.user);
            //             this.$router.push({ path: '/' });
            //             Loading.hide()
            //         },
            //         (err) => {
            //             context.commit('LOGIN_ERROR', err.message)
            //             Loading.hide()
            //         }
            //     );
        },
        logout(context) {
            const obj = JSON.parse(localStorage.access_user)
            let token = obj.access_token

            Loading.show(LoadingParameters)

            // Login Laravel
            axios.request('post', `/logout`, '', { Authorization: 'Bearer ' + token })
                .then(response => {
                    context.commit('LOGOUT_SUCCESS', response.data)
                    this.$router.push({path: 'login'})
                    Loading.hide()
                }).catch(error => {
                    this.error = error
                    Loading.hide()
                })

            // Login Firebase
            // const auth = getAuth();
            // signOut(auth).then(() => {
            //     this.$router.push({ path: 'login' })
            //     Loading.hide()
            // }).catch((error) => {
            //     context.commit('LOGOUT_SUCCESS', '')
            //     this.error = error
            //     Loading.hide()
            // });

        },
    },
    getters: {
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
            state.isAuthenticated = true,
            localStorage.access_user = JSON.stringify(payload.result)            
            localStorage.isAuthenticated = true
        },
        [LOGIN_ERROR](state, payload) {
            state.error = payload.error
        },
        [GET_DATA](state, payload) {
            state.isLoading = payload
        },
        [LOGOUT_SUCCESS](state, payload) {
            state.access_user = {}
            state.isAuthenticated = false
            localStorage.access_user = ""
            localStorage.isAuthenticated = false
        }
    }
}