export const testStore =  {
  state: {
    id: null,
  },

  mutations: {
    SET_TEST(state, testObj) {
      state.id = testObj.id
    }
  },

  actions: {

  }
}
