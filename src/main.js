import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import VueYoutube from 'vue-youtube'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

Vue.use(VueYoutube)

require('@/store/subscriber')

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://127.0.0.1:81/api'

const fpPromise = FingerprintJS.load()

;(async () => {
  const fp = await fpPromise
  const result = await fp.get()
  window.VISITOR_ID = result.visitorId;

  store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  })
})()


Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      if (!(el == event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});
