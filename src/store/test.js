export const testStore =  {
  state: {
    id: null,
    name: '',
  },

  mutations: {
    SET_TEST(state, testObj) {
      state.id = testObj.id
      state.name = testObj.name
    }
  },

  actions: {

  }
}
