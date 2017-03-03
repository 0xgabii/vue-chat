import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: true,
    myAccount: {},
  },
  mutations: {
    SET_AUTH (state, value) {
      state.auth = value;
    },
    SET_MYACCOUNT (state, obj) {
      state.myAccount = obj;
    },
  },
  actions: {
   setMyAccount ({commit}, obj) {
     commit('SET_MYACCOUNT', obj);
   },
   setAuth ({commit}, value) {
     commit('SET_AUTH', value);
   }
  }
});