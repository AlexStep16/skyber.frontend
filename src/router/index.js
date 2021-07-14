import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import MakeTest from '../views/MakeTest.vue'
import Scenario from '../views/Scenario.vue'
import MakeScenario from '../components/Scenarios/MakeScenario.vue'
import ScenariosMenu from '../components/Scenarios/ScenariosMenu.vue'
import TestCreator from '../views/TestCreator.vue'
import PasswordRecovery from '../views/PasswordRecovery.vue'
//import PollCreator from '../views/PollCreator.vue'
import List from '../views/List.vue'
//import MakePoll from '../views/MakePoll.vue'
import Tests from '../views/Tests.vue'
//import Polls from '../views/Polls.vue'
import Stats from '../views/Stats.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/authenticated']) {
        return next({
          name: 'List'
        })
      }
      else {
        return next({
          name: 'TestCreator'
        })
      }
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/authenticated']) {
        return next({
          name: 'List'
        })
      }
      next();
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/authenticated']) {
        return next({
          name: 'List'
        })
      }
      next();
    },
  },
  {
    path: '/password/recovery',
    name: 'PasswordRecovery',
    component: PasswordRecovery,
  },
  {
    path: '/test/edit/:hash',
    name: 'MakeTest',
    component: MakeTest,
    props: true,
  },
  {
    path: '/test/scenario/',
    name: 'Scenario',
    component: Scenario,
    props: true,
    children: [
      {
        path: 'add/:hash',
        component: MakeScenario,
        props: {
          isEdit: false
        }
      },
      {
        path: 'menu/:hash',
        component: ScenariosMenu
      },
      {
        path: 'edit/:id',
        component: MakeScenario,
        props: {
          isEdit: true
        }
      },
    ]
  },
  {
    path: '/test/create',
    name: 'TestCreator',
    component: TestCreator,
    props: true,
  },
  {
    path: '/list',
    name: 'List',
    component: List,
  },
  /* {
    path: '/poll/create',
    name: 'PollCreator',
    component: PollCreator,
    props: true,
  },
  {
    path: '/poll/edit/:hash',
    name: 'MakePoll',
    component: MakePoll,
    props: true,
  }, */
  {
    path: '/tests/:hash',
    name: 'Tests',
    component: Tests
  },
  /* {
    path: '/polls/:hash',
    name: 'Polls',
    component: Polls
  }, */
  {
    path: '/stats/:hash',
    name: 'Stats',
    component: Stats
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
