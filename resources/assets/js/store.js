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
  isAuth: false,
  cart: [],
  bag: [],
  userLoadStatus: 0,
  userUpdateStatus: 0,
  url: '' // ruta relativa del servidor
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
  setUrl(state, url) {
    state.url = url;
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
  },
  setBag(state, val) {
    state.bag = val;
  },
  setCart(state, val) {
    state.cart = val;
  },
  addCart(state,val){
    state.cart.push({...val})
  },
  addBag(state,val){
    state.bag.push({...val})
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
    $("#preloader").show()
    $(".loading").show()
    CerService.post('/login/auth')
      .then(function (response) {
       
        if (response.res != 0) {
          commit('setUser', response.user);
          commit('setUserLoadStatus', 1);
          commit('setIsAuth', true);
          commit('setCart',response.cart);;
          commit('setBag',response.bag);

        } else {
          commit('setIsAuth', false);
          commit('setUser', {});
          commit('setCart',[]);;
          commit('setBag',[]);
        }
        $(".loading").fadeOut();
        $("#preloader").delay(400).fadeOut("slow");
      })
      .catch(function () {
        commit('setUser', {});
        commit('setUserLoadStatus', 0);
        commit('setIsAuth', false);
        commit('setCart',[]);
        commit('setBag',[]);
        $(".loading").fadeOut();
        $("#preloader").delay(400).fadeOut("slow");

      });
  },
  logoutUser({ commit }) {
    commit('setUserLoadStatus', 0);
    commit('setIsAuth', false);
    commit('setUser', {});
    commit('setCart',[]);
    commit('setBag',[]);
  },
  actionAddCart({commit},cart){
    
      return new Promise((resolve, reject) => {

        CerService.post('/add/cart', cart)
            .then(resp => {

                if (resp.res===1) {
                  commit('addCart', cart);
                } 
                resolve(resp.res)
            })
            .catch(err => {
                reject(err)
            })
    })
  },
  actionAddBag({commit},bag){
    return new Promise((resolve, reject) => {

      CerService.post('/add/bag', bag)
          .then(resp => {

              if (resp.res===1) {
                commit('addBag', bag);
              } 
              resolve(resp.res)
          })
          .catch(err => {
              reject(err)
          })
    })
  },
  logout({ commit }) {
    
    return new Promise((resolve, reject) => {
      CerService.post('/logout')
      .then(function (response) {

        commit('setUserLoadStatus', 0);
        commit('setIsAuth', false);
        commit('setUser', {});
        commit('setCart',[]);
        commit('setBag',[]);
        resolve(response)


      })
      .catch(err => {
          reject(err)
      })
    })

  },
  cambiarUrl({ commit }, valor) {
    commit('setUrl', valor);
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
  cambiarIsAuth({ commit }, valor) {
    commit('setIsAuth', valor);
  },
  cambiarBag({ commit }, valor) {
    commit('setBag', valor);
  },
  cambiarCart({ commit }, valor) {
    commit('setCart', valor);
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
  getUrl(state) {
    return state.url;
  },
  getCart(state) {
    return state.cart;
  },
  getBag(state) {
    return state.bag;
  },

  /*
    Gets the user update status
  */
  getUserUpdateStatus(state, status) {
    return state.userUpdateStatus;
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


