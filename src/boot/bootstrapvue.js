import { BootstrapVue, BootstrapVueIcons  } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default ({ Vue }) => {
  Vue.use(BootstrapVue)
  Vue.use(BootstrapVueIcons)
}