export default {
  namespaced: true,
  state: {
    progress: 0
  },
  mutations: {
    UPDATE_PROGRESS(state, value) {
      state.progress = value;
    },
    CLEAR_PROGRESS(state) {
      state.progress = 0;
    }
  },
  actions: {
    updateProgress({ commit }, value) {
      commit('UPDATE_PROGRESS', value);
      if(value === 100) {
        setTimeout(() => {
          commit('CLEAR_PROGRESS');
        }, 1000);
      }
    }
  }
}