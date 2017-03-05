export default {
  namespaced: true,
  state: {
    newChat: '',
  },
  mutations: {
    UPDATE_MESSAGE(state, value) {
      state.newChat = value;
    },
    CLEAR_MESSAGE(state) {
      state.newChat = '';
    }
  },
  actions: {
    updateMessage({ commit }, value) {
      commit('UPDATE_MESSAGE', value);
      commit('CLEAR_MESSAGE')
    }
  }
}