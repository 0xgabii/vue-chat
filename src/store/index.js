import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    myAccount: {},
  },
  mutations: {
    SET_MYACCOUNT (state, obj) {
      state.myAccount = obj;
    },
  },
  actions: {
   setMyAccount ({commit}, obj) {
     commit('SET_MYACCOUNT', obj);
   },
  }
});