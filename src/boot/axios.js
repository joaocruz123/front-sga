import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios
// ^ ^ ^ this will allow you to use this.$axios
//       so you won't necessarily have to import axios in each vue file

const via = axios.create({ baseURL: 'https://viacep.com.br/ws' })
Vue.prototype.$via = via


const api = axios.create({ baseURL: 'http://localhost/api' })
Vue.prototype.$api = api
// ^ ^ ^ this will allow you to use this.$api
//       so you can easily perform requests against your app's API

export { axios, via, api }