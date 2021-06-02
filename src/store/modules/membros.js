import axios from './../../plugins/axios'
import {Loading} from 'quasar'
import { Notify } from 'quasar'
import { QSpinnerPuff } from 'quasar'
import { api } from 'boot/axios'

import {
    GET_DATA,
    GET_DATA_SUCCESS,
    GET_DATA_FAILURE,
    CREATE_SUCCESS,
    EDIT_SUCCESS,
    DELETE_SUCCESS
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
        isLoading: false,
        membros:[]
    },
    actions: {
        getMembros(context) {
            const obj = JSON.parse(localStorage.access_user)
            let token = obj.access_token

            Loading.show(LoadingParameters)
            context.commit('GET_DATA', true)

            axios.request('get', `/membros`, '', { Authorization: 'Bearer ' + token })
            .then(response => {
                context.commit('GET_DATA_SUCCESS', response.data)
                /Loading.hide()
                context.commit('GET_DATA', false)
            }).catch(error => {
                context.commit('GET_DATA_FAILURE', response.data)
                this.error = error
            })
        },
        saveMembro(context, data){
            const obj = JSON.parse(localStorage.access_user)
            let token = obj.access_token
            
            Loading.show(LoadingParameters)
            context.commit('GET_DATA', true)

            axios.request('post', `/membros`, data, { Authorization: 'Bearer ' + token,
            headers: {
                "Content-Type": "multipart/form-data"
            }})
            .then(response => {
                context.commit('CREATE_SUCCESS', response.data)
                Loading.hide()
                context.commit('GET_DATA', false)
                Notify.create({
                    type: 'positive',
                    message: `Novo membro cadastrado com sucesso.`,
                    icon: 'done_all'
                })
            }).catch(error => {
                context.commit('GET_DATA_FAILURE', error)
                this.error = error
            })
        },
        editMembro(context, params){
            const obj = JSON.parse(localStorage.access_user)
            let token = obj.access_token

            Loading.show()

            let id = params[0]
            let data = params[1]

            axios.request('put', `/membros/${id}`, data, { Authorization: 'Bearer ' + token })
            .then(response => {
                context.commit('EDIT_SUCCESS', response.data)
                Loading.hide()
                Notify.create({
                    type: 'positive',
                    message: `Membro editado com sucesso.`,
                    icon: 'edit'
                })
            }).catch(error => {
                context.commit('GET_DATA_FAILURE', response.data)
                this.error = error
            })
        },
        deleteMembros(context, id){
            const obj = JSON.parse(localStorage.access_user)
            let token = obj.token

            Loading.show()

            axios.request('delete', `/membros/${id}`, '', { Authorization: 'Bearer ' + token })
            .then(response => {
                context.commit('DELETE_SUCCESS', response.data)
                Loading.hide()
                Notify.create({
                    type: 'negative',
                    message: `Membro deletado da base de dados.`,
                    icon: 'delete_forever'
                })
            }).catch(error => {
                context.commit('GET_DATA_FAILURE', response.data)
                this.error = error
            })
        }
    },
    mutations: {
        [GET_DATA](state, payload) {
            state.isLoading = payload
        },
        [GET_DATA_SUCCESS](state, payload) {
            state.membros = payload.data
        },
        [CREATE_SUCCESS](state,payload){

        },
        [EDIT_SUCCESS](state,payload){

        },
        [DELETE_SUCCESS](state,payload){

        },
    }
}