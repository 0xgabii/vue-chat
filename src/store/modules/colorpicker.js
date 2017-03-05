export default {
  namespaced: true,
  state: {     
    visible: false,
    data: [
      {
        value: '#673ab7',
        selected: true,
      },
      {
        value: '#ff9800',
        selected: false,
      },
      {
        value: '#03a9f4',
        selected: false,
      },
      {
        value: '#cddc39',
        selected: false,
      },
      {
        value: '#009688',
        selected: false,
      },
      {
        value: '#e91e63',
        selected: false,
      },
      {
        value: '#607d8b',
        selected: false,
      },
      {
        value: '#795548',
        selected: false,
      },
      {
        value: '#ff5722',
        selected: false,
      }
    ]
  },
  getters: {
    selectedColor: state => state.data.filter(item => item.selected == true)[0].value
  },
  mutations: {
    OPEN(state) {
      state.visible = true;
    },
    CHANGE_COLOR_SELECTED(state, value) {
      state.data.forEach(item => {
        item.selected = (item == value ? true : false);
      });
    },
    CLOSE(state) {
      state.visible = false;
    }
  },
  actions: {
    open({ commit}) {
      commit('OPEN');
    },
    changeColor({ commit }, value) {
      commit('CHANGE_COLOR_SELECTED', value);
    },
    close({ commit }) {
      commit('CLOSE');
    }
  }
}