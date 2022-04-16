import axios from './../../plugins/axios'
import { Loading } from 'quasar'
import { Notify } from 'quasar'
import { QSpinnerPuff } from 'quasar'
import { LoadingBar } from 'quasar'

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
  messageColor: 'white'
}

LoadingBar.setDefaults({
  color: 'secondary',
  size: '5px',
  position: 'bottom'
})

export default {
  namespaced: true,
  state: {
    isLoading: true,
    cargos: [],
    cargoId: {},
    total: 1,
    last_page: 1
  },
  actions: {
    getCargos(context, page) {
      const obj = JSON.parse(localStorage.access_user)
      let token = obj.access_token

      context.commit('GET_DATA', true)

      axios.request('get', `/cargos?page=${page}`, '', { Authorization: 'Bearer ' + token })
        .then(response => {
          context.commit('GET_DATA_SUCCESS', response.data)
          context.commit('GET_DATA', false)
        }).catch(error => {
          context.commit('GET_DATA_FAILURE', error.data)
          this.error = error
        })
    },
    async getCargoId(context, id) {
      const obj = JSON.parse(localStorage.access_user)
      let token = obj.access_token

      Loading.show(LoadingParameters)

      await axios.request('get', `/cargos/${id}`, '', { Authorization: 'Bearer ' + token })
        .then(response => {
          context.commit('GET_DATA_ID', response.data)
          console.log(response.data)
          Loading.hide()
        }).catch(error => {
          context.commit('GET_FAILURE_ID', error.data)
          this.error = error
        })
    },
    saveCargo(context, data) {
      const obj = JSON.parse(localStorage.access_user)
      let token = obj.access_token

      Loading.show(LoadingParameters)

      axios.request('post', `/cargos`, data, { Authorization: 'Bearer ' + token })
        .then(response => {
          Loading.hide()

          context.commit('CREATE_SUCCESS', response.data)
          this.$router.push({ name: 'cargos' })
          Notify.create({
            color: 'primary',
            message: `Novo cargo cadastrado com sucesso.`,
            icon: 'done_all'
          })
        }).catch(error => {
          context.commit('GET_DATA_FAILURE', error.data)
          this.error = error
        })
    },
    editCargo(context, params) {
      const obj = JSON.parse(localStorage.access_user)
      let token = obj.access_token

      Loading.show(LoadingParameters)

      let id = params[0]
      let data = params[1]

      axios.request('put', `/cargos/${id}`, data, { Authorization: 'Bearer ' + token })
        .then(response => {
          Loading.hide()

          context.commit('EDIT_SUCCESS', response.data)
          this.$router.push({ name: 'cargos' })
          Loading.hide();
          context.commit('SET_LOADING', false);
          Notify.create({
            color: 'primary',
            message: `Cargo editado com sucesso.`,
            icon: 'edit'
          });
        }).catch(error => {
          context.commit('GET_DATA_FAILURE', error.data)
          this.error = error
        })
    },
    async deleteCargos(context, id) {
      const obj = JSON.parse(localStorage.access_user)
      let token = obj.access_token

      Loading.show(LoadingParameters)

      await axios.request('delete', `/cargos/${id}`, '', { Authorization: 'Bearer ' + token })
        .then(response => {
          context.commit('DELETE_SUCCESS', response.data)
          Loading.hide()
          Notify.create({
            type: 'negative',
            message: `Cargo deletado da base de dados.`,
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
    [GET_DATA_FAILURE]() { },
    [GET_FAILURE_ID]() { },
    [GET_DATA_SUCCESS](state, payload) {
      state.cargos = payload.data.data
      state.total = payload.data.total
      state.last_page = payload.data.last_page
      localStorage.cargos = JSON.stringify(payload.data.data)
    },
    [GET_DATA_ID](state, payload) {
      state.cargoId = payload.data
    },
    [CREATE_SUCCESS](state, payload) {

    },
    [EDIT_SUCCESS](state, payload) {

    },
    [DELETE_SUCCESS](state, payload) {

    },
  }
}
