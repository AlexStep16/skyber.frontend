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
    showLoader: false,
  },
  getters: {
    loaderState(state) {
      return state.showLoader
    },
  },
  mutations: {
    SHOW_LOADER(state) {
      state.showLoader = true
    }, 
    HIDE_LOADER(state) {
      state.showLoader = false
    }
  },
  actions: {
  },
  modules: {
    auth, testStore, pollStore
  },
  plugins: [testState],
})
