import axios from './../../plugins/axios'
import {Loading} from 'quasar'
import { Notify } from 'quasar'
import { QSpinnerPuff } from 'quasar'

import {
    GET_DATA,
    GET_DATA_SUCCESS,
    GET_DATA_FAILURE,
    CREATE_SUCCESS,
    EDIT_SUCCESS,
    DELETE_SUCCESS,
    GET_DATA_ID,
    GET_FAILURE_ID,
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
        membros:[],
        membroId: {}
    },
    actions: {
        getMembros(context) {
            const obj = JSON.parse(localStorage.access_user)
            let token = obj.access_token

            //Loading.show(LoadingParameters)
            context.commit('GET_DATA', true)

            axios.request('get', `/membros`, '', { Authorization: 'Bearer ' + token })
            .then(response => {
                context.commit('GET_DATA_SUCCESS', response.data)
                //Loading.hide()
                context.commit('GET_DATA', false)
            }).catch(error => {
                context.commit('GET_DATA_FAILURE', error.data)
                this.error = error
            })
        },
        async getMembroId(context, id){
            const obj = JSON.parse(localStorage.access_user)
            let token = obj.access_token

            Loading.show(LoadingParameters)

            await axios.request('get', `/membros/${id}`, '', { Authorization: 'Bearer ' + token })
            .then(response => {
                context.commit('GET_DATA_ID', response.data)
                console.log(response.data)
                Loading.hide()
            }).catch(error => {
                context.commit('GET_FAILURE_ID', error.data)
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
                this.$router.push({name: 'membros'})
                Loading.hide()
                context.commit('GET_DATA', false)
                Notify.create({
                    color: 'primary',
                    message: `Novo membro cadastrado com sucesso.`,
                    icon: 'done_all'
                })
            }).catch(error => {
                context.commit('GET_DATA_FAILURE', error.data)
                this.error = error
            })
        },
        editMembro(context, params){
            const obj = JSON.parse(localStorage.access_user)
            let token = obj.access_token

            Loading.show(LoadingParameters)

            let id = params[0]
            let data = params[1]

            axios.request('put', `/membros/${id}`, data, {Authorization: 'Bearer ' + token,
            headers: {
                "Content-Type": "multipart/form-data"
            }})
            .then(response => {
                context.commit('EDIT_SUCCESS', response.data)
                this.$router.push({name: 'membros'})
                Loading.hide()
                Notify.create({
                    color: 'primary',
                    message: `Membro editado com sucesso.`,
                    icon: 'edit'
                })
            }).catch(error => {
                context.commit('GET_DATA_FAILURE', error.data)
                this.error = error
            })
        },
        async deleteMembros(context, id){
            const obj = JSON.parse(localStorage.access_user)
            let token = obj.access_token

            Loading.show(LoadingParameters)

            await axios.request('delete', `/membros/${id}`, '', { Authorization: 'Bearer ' + token })
            .then(response => {
                context.commit('DELETE_SUCCESS', response.data)
                Loading.hide()
                Notify.create({
                    type: 'negative',
                    message: `Membro deletado da base de dados.`,
                    icon: 'delete_forever'
                })
            }).catch(error => {
                context.commit('GET_DATA_FAILURE', error.data)
                this.error = error
            })
        }
    },
    mutations: {
        [GET_DATA](state, payload) {
            state.isLoading = payload
        },
        [GET_DATA_FAILURE](){},
        [GET_FAILURE_ID](){},
        [GET_DATA_SUCCESS](state, payload) {
            state.membros = payload.data
            localStorage.membros = JSON.stringify(payload.data)            
        },
        [GET_DATA_ID](state, payload){
            state.membroId = payload.data
        },
        [CREATE_SUCCESS](state,payload){},
        [EDIT_SUCCESS](state,payload){},
        [DELETE_SUCCESS](state,payload){},
    }
}