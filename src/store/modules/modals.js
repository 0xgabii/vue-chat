export default {
  namespaced: true,
  state: {
    photoUpload: {
      visible: false
    },
    viewOriginal: {
      visible: false,
      img: ''
    },
    onlineUsers: {
      visible: false,
    }
  },
  mutations: {
    OPEN(state, modalName) {
      state[modalName].visible = true;
    },
    VIEW_ORIGINAL(state, value) {
      state.viewOriginal.img = value;
    },
    CLOSE(state) {
      Object.keys(state).forEach(key => { state[key].visible = false});
    }
  },
  actions: {
    open({ commit }, modalName) {
      commit('CLOSE');
      commit('OPEN', modalName);
    },
    viewOriginal({ commit }, value) {
      commit('VIEW_ORIGINAL', value);
    },
    close({ commit }) {
      commit('CLOSE');
    }
  }
}