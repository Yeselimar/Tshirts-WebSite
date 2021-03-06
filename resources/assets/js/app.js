
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.$ = window.jQuery = require('jquery');
    require('bootstrap');
    require('jquery-match-height');
    require('slicknav/dist/jquery.slicknav');
    require('owl.carousel');
    require('jquery.nicescroll');
    require('jquery-zoom');
    require('jquery-ui');
    require('./main')

} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

import Vue            from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import VueKonva from 'vue-konva';
import BootstrapVue from 'bootstrap-vue';


Vue.use(VueKonva)

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}

Vue.use(VueSweetalert2, options)
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate, { fieldsBagName: 'veeFields' });
import VueScrollTo from 'vue-scrollto';
Vue.use(VueScrollTo);
import VueCarousel from 'vue-carousel';

Vue.use(VueCarousel);
Vue.use(BootstrapVue)


/*
	Imports all of the modules used in the application to build the data store.
*/
import store from './indexStore';
/*
  Imports the routes and store and vue to use with the Vue module.
*/
import router from './routes'

/*
  Create a new Vue instance and mount the app element.
*/
const app = new Vue({
  el: "#app",
  store,
  router : router,
  VueSweetalert2,
  VeeValidate,
  VueScrollTo,
  VueKonva,
  VueCarousel,
  BootstrapVue,

});

export default app;

// This is a global mixin, it is applied to every vue instance

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

/*Vue.component('example-component', require('./components/ExampleComponent.vue'));

const app = new Vue({
    el: '#app'
});
*/
