/*
|-------------------------------------------------------------------------------
| VUEX modules/index.js
|-------------------------------------------------------------------------------
| The Vuex data store 
*/
import CerService from '../plugins/CerService';

const state = {
  user: {},
  isAuth: false
}
/*
  Defines the mutations used by the module.
*/
const mutations = {

  /*
    Sets the user
  */
  setUser(state, user) {
    state.user = user;
  },
  setIsAuth(state, val) {
    state.isAuth = val
  },
}
/*
  Defines the actions used by the module.
*/
const actions = {
  /*
      Loads all of the search methods.
    */
  loadUserAdmin({ commit }) {
    CerService.post('/login/admin/auth')
      .then(function (response) {
        commit('setIsAuth', false);
        commit('setUser', {});
        if (response.res != 0) {
          commit('setUser', response.user);
          commit('setIsAuth', true);
        }
      })
      .catch(function () {
        commit('setUser', {});
        commit('setIsAuth', false);

      });
  },
  logoutUserAdmin({ commit }) {
    CerService.post('/logout/admin')
    .then(function (response) {

        commit('setUser', {});
        commit('setIsAuth', false);

    })
  },
  logout({ commit }) {
    commit('setUser', {});
    commit('setIsAuth', false);
  },
  cambiarUser({ commit }, valor) {
    commit('setUser', valor);
  },
  cambiarIsAuth({ commit }, valor) {
    commit('setIsAuth', valor);
  },
}
/*
  Defines the getters used by the module.
*/
const getters = {

  /*
    Returns the user.
  */
  getUser(state) {
    return state.user;
  },

  getIsAuth(state) {
    return state.isAuth
  },

}

export default {
  state,
  getters,
  actions,
  mutations
}


