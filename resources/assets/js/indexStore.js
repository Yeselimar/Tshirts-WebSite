/*
	Initializes Vuex on Vue.
*/
import Vue            from 'vue';
import Vuex from 'vuex'
Vue.use( Vuex )

require('es6-promise').polyfill();


/*
	Imports all of the modules used in the application to build the data store.
*/
import stores from './store.js';

/*
  Exports our data store.
*/
const store = new Vuex.Store({
	modules: {
		stores,
	}
});

export default store;