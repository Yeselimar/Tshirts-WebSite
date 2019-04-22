/*
|-------------------------------------------------------------------------------
| VUEX modules/index.js
|-------------------------------------------------------------------------------
| The Vuex data store 
*/
import CerService from './plugins/CerService';

const state = {
  search: '',
  rubro: '',
  isDesign: false,
  user: {},
  numCart: 0,
  numBag: 0,
  isAuth: false,
  userLoadStatus: 0,
  userUpdateStatus: 0
}
/*
  Defines the mutations used by the module.
*/
const mutations = {
  /*
        Sets the user load status
      */
  setUserLoadStatus(state, status) {
    state.userLoadStatus = status;
  },

  /*
    Sets the user
  */
  setUser(state, user) {
    state.user = user;
  },

  /*
    Sets the user update status
  */
  setUserUpdateStatus(state, status) {
    state.userUpdateStatus = status;
  },
  setNumCart(state, val) {
    state.numCart = val
  },
  setNumBag(state, val) {
    state.numBag = val
  },
  setIsAuth(state, val) {
    state.isAuth = val
  },
  /*
  Sets val of the search.
*/
  setSearch(state, val) {
    state.search = val;
  },

  /*
    Sets val of the rubro .
  */
  setRubro(state, val) {
    state.rubro = val;
  },
  /*
   Sets val of the isDesign .
 */
  setIsDesign(state, val) {
    state.isDesign = val;
  }
}
/*
  Defines the actions used by the module.
*/
const actions = {
  /*
      Loads all of the search methods.
    */
  loadUser({ commit }) {
    CerService.post('/login/auth')
      .then(function (response) {
        commit('setIsAuth', false);
        commit('setUser', {});

        if (response.res != 0) {
          commit('setUser', response.user);
          commit('setUserLoadStatus', 1);
          commit('setIsAuth', true);

        }

      })
      .catch(function () {
        commit('setUser', {});
        commit('setUserLoadStatus', 0);
        commit('setIsAuth', false);

      });
  },
  logoutUser({ commit }) {
    commit('setUserLoadStatus', 0);
    commit('setIsAuth', false);
    commit('setUser', {});
  },
  logout({ commit }) {
    CerService.post('/logout')
    .then(function (response) {

        commit('setUser', {});
        commit('setUserLoadStatus', 0);
        commit('setIsAuth', false);

    })
  },
  cambiarSearch({ commit }, valor) {
    commit('setSearch', valor);
  },
  cambiarIsDesign({ commit }, valor) {
    commit('setIsDesign', valor);
  },
  cambiarRubro({ commit }, valor) {
    commit('setRubro', valor);
  },
  cambiarUser({ commit }, valor) {
    commit('setUser', valor);
  },
  cambiarNumCart({ commit }, valor) {
    commit('setNumCart', valor);
  },
  cambiarNumBag({ commit }, valor) {
    commit('setNumBag', valor);
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
 Returns the user load status.
*/
  getUserLoadStatus(state) {
    return function () {
      return state.userLoadStatus;
    }
  },

  /*
    Returns the user.
  */
  getUser(state) {
    return state.user;
  },

  /*
    Gets the user update status
  */
  getUserUpdateStatus(state, status) {
    return state.userUpdateStatus;
  },
  getNumCart(state) {
    return state.numCart
  },
  getNumBag(state) {
    return state.numBag
  },
  getIsAuth(state) {
    return state.isAuth
  },
  /*
     Returns search.
   */
  getSearch(state) {
    return state.search;
  },

  /*
    Returns rubro.
  */
  getRubro(state) {
    return state.rubro;
  },
  /*
     Returns isDesign.
   */
  getIsDesign(state) {
    return state.isDesign;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}


