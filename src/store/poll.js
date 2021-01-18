export const pollStore =  {
  state: {
    id: null,
    name: '',
  },

  mutations: {
    SET_POLL(state, pollObj) {
      state.id = pollObj.id
      state.name = pollObj.name
    }
  },

  actions: {

  }
}
