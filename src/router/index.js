import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Privacy from '../views/Privacy.vue'
import MakeTest from '../views/MakeTest.vue'
import MakeScenario from '../views/MakeScenario.vue'
import Page404 from '@/components/Page404.vue'
import ScenariosMenu from '../views/ScenariosMenu.vue'
import TestCreator from '../views/TestCreator.vue'
import PasswordRecovery from '../views/PasswordRecovery.vue'
import PasswordRecoveryChange from '../views/PasswordRecoveryChange.vue'
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
    //meta: {title:'Главная'},
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
    //meta: {title:'Вход'},
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
    //meta: {title:'Регистрация'},
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
   // meta: {title:'Восстановление пароля'},
    component: PasswordRecovery,
  },
  {
    path: '/password/change/:hash',
    name: 'PasswordRecoveryChange',
    //meta: {title:'Изменение пароля'},
    component: PasswordRecoveryChange,
    props: true,
  },
  {
    path: '/test/edit/:hash',
   // meta: {title:'Создание теста'},
    name: 'MakeTest',
    component: MakeTest,
    props: true,
  },
  {
    path: '/test/scenario/menu/:hash',
    //meta: {title:'Управление сценариями'},
    name: 'ScenariosMenu',
    component: ScenariosMenu,
  },
  {
    path: '/test/scenario/edit/:id',
    //meta: {title:'Редактирование сценария'},
    name: 'MakeScenario',
    component: MakeScenario,
  },
  {
    path: '/test/create',
    name: 'TestCreator',
   // meta: {title:'Создание теста'},
    component: TestCreator,
    props: true,
  },
  {
    path: '/list',
   // meta: {title:'Главная'},
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
   // meta: {title:'Статистика'},
    component: Stats
  },
  {
    path: '/privacy',
    name: 'Privacy',
    //meta: {title:'Политика конфиденциальности'},
    component: Privacy
  },
  {
    path: '*',
    name: '404',
    //meta: {title:'Страница не найдена'},
    component: Page404,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
