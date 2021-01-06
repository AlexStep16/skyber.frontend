import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'
import Register from '../views/Register.vue'
import MakeTest from '../views/MakeTest.vue'
import Options from '../views/Options.vue'
import List from '../views/List.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/authenticated']) {
        return next({
          name: 'Options'
        })
      }
      next();
    },
    
  },
  {
    path: '/login',
    redirect: { 
      name: 'Home' 
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/authenticated']) {
        return next({
          name: 'Options'
        })
      }
      next();
    },
  },
  {
    path: '/create',
    name: 'MakeTest',
    component: MakeTest
  },
  {
    path: '/options',
    name: 'Options',
    component: Options
  },
  {
    path: '/list',
    name: 'List',
    component: List
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
