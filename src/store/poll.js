export const pollStore =  {
  state: {
    draftHash: null,
  },

  mutations: {
    SET_POLL_DRAFT(state, hash) {
      state.draftHash = hash
    },
    CLEAR_POLL_DRAFT(state) {
      state.draftHash = null
    }
  },

  actions: {

  }
}
