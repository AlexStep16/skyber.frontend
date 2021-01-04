import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//import store from '../store'
import Register from '../views/Register.vue'
import MakeTest from '../views/MakeTest.vue'
import Options from '../views/Options.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,/*
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/authenticated']) {
        return next({
          name: 'MakeTest'
        })
      }
      next();
    },*/
    
  },
  {
    path: '/register',
    name: 'Register',
    component: Register/*,
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/authenticated']) {
        return next({
          name: 'MakeTest'
        })
      }
      next();
    },*/
  },
  {
    path: '/create',
    name: 'MakeTest',
    component: MakeTest,
    /*beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'Home'
        })
      }
    },*/
  },
  {
    path: '/options',
    name: 'Options',
    component: Options,
    /*beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'Home'
        })
      }
    },*/
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
