import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'

require('@/store/subscriber')

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://skyber.loc/api'

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')  
})
