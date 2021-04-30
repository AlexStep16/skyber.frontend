export const testStore =  {
  state: {
    draftHash: null,
  },

  mutations: {
    SET_TEST_DRAFT(state, hash) {
      state.draftHash = hash
    },
    CLEAR_TEST_DRAFT(state) {
      state.draftHash = null
    }
  },

  actions: {

  }
}
