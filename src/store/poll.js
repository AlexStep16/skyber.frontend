export const pollStore =  {
  state: {
    id: null,
  },

  mutations: {
    SET_POLL(state, pollObj) {
      state.id = pollObj.id
    }
  },

  actions: {

  }
}
