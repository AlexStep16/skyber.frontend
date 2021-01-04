export const pollStore =  {
  state: {
    id: null,
    name: '',
    description: ''
  },

  mutations: {
    SET_POLL(state, pollObj) {
      state.id = pollObj.id
      state.name = pollObj.name
      state.description = pollObj.description
    }
  },

  actions: {

  }
}
