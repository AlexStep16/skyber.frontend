export const testStore =  {
  state: {
    id: null,
    name: '',
    description: ''
  },

  mutations: {
    SET_TEST(state, testObj) {
      state.id = testObj.id
      state.name = testObj.name
      state.description = testObj.description
    }
  },

  actions: {

  }
}
