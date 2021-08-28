import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import VueYoutube from 'vue-youtube'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import VueSocialSharing from 'vue-social-sharing'
import VueMeta from 'vue-meta'
import VueYandexMetrika from 'vue-yandex-metrika'       
import TextareaAutosize from 'vue-textarea-autosize'

Vue.use(VueYoutube)
Vue.use(VueSocialSharing)
Vue.use(VueMeta)
Vue.use(TextareaAutosize)
Vue.use(VueYandexMetrika, {
  id: 84641437,
  router: router,
  env: 'production'
})

require('@/store/subscriber')

Vue.config.productionTip = false

axios.defaults.baseURL = process.env.VUE_APP_AXIOS_BASE_URL

const fpPromise = FingerprintJS.load() //{token: 'tBBOBWl7ucK1ISF13dGL'}

Vue.mixin({
  methods: {
    RESIZER_imageMouseDown(event, img, domWidth, domHeight, direction = 'right') {
      img.activateOver = true
      if(!img.width) img.width = domWidth
      img.ratio = img.width < img.height ? img.width / img.height : img.height / img.width
      img.bigger = img.width < img.height ? 'height' : 'width'
      let pageX = event.pageX ? event.pageX : event.touches[0].pageX;
      img.startPointX = pageX
      img.startWidth = img.width
      img.direction = direction
    },
    RESIZER_imageMouseMove(event, img) {
      if(img.activateOver === true) {
        let pageX = event.pageX ? event.pageX : event.touches[0].pageX;
        let width = parseInt(img.direction === 'right' ? (img.startWidth + (pageX - img.startPointX)) : (img.startWidth + (img.startPointX - pageX)))
        width = width < 200 ? 200 : width
        //let height = parseInt(img.bigger === 'width' ? Math.round(img.width * img.ratio) : Math.round(img.width / img.ratio))
        img.width =  width
      }
    }
  }
})
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

localStorage.setItem('testSaves', JSON.stringify([]))

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
