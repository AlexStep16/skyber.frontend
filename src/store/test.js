export const testStore =  {
  state: {
    id: null,
  },

  mutations: {
    SET_TEST(state, testObj) {
      state.id = testObj.id
    },
    CLEAR_TEST(state) {
      state.id = null
    }
  },

  actions: {

  }
}
