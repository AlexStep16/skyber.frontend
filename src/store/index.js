import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import { testStore } from './test'
import { pollStore } from './poll'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

const testState = createPersistedState({
  paths: ['testStore', 'pollStore']
})

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth, testStore, pollStore
  },
  plugins: [testState],
})
