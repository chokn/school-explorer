import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import { createProvider } from './vue-apollo'
import 'leaflet/dist/leaflet.css'

Vue.config.productionTip = false

new Vue({
  provide: createProvider().provide(),
  render: h => h(App)
}).$mount('#app')
