import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './indexStoreBack';
import CerService from '../plugins/CerService';
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
	routes: [
       
        {
                path: 'login',
                name: 'login',
                component: Vue.component( 'Login', require( './components/pages/loginComponent.vue' ) ),
                meta: { requiresAuth: false } 
        },

		{
			path: '/admin/',
            component: Vue.component( 'Back', require( './components/Back.vue' ) ),
            meta: { requiresAuth: true },
			children: [
                {
                    path: '',
                    redirect: 'index'
                },
                {
					path: '',
					name: 'index',
					component: Vue.component( 'Admin', require( './components/pages/adminComponent.vue' ) ),
					default: true,
					meta: { requiresAuth: true } 
                },
							
                {
                    path: 'rubros',
                    name: 'rubros',
                    component: Vue.component( 'Rubros', require( './components/pages/rubros/rubrosComponent.vue' ) ),
                    meta: { requiresAuth: true } 
                },
                {
                    path: 'grupos',
                    name: 'grupos',
                    component: Vue.component( 'Grupos', require( './components/pages/grupos/gruposComponent.vue' ) ),
                    meta: { requiresAuth: false } 
                },
                {
                    path: 'grupo/:id/caracteristicas',
                    name: 'grupo.caracteristicas',
                    component: Vue.component( 'Caracteristicas', require( './components/pages/caracteristicas/caracteristicasComponent.vue' ) ),
                    meta: { requiresAuth: false } 
                },
                /*{
                    path: 'caracteristicas',
                    name: 'caracteristicas',
                    component: Vue.component( 'Caracteristicas', require( './components/pages/caracteristicas/caracteristicasComponent.vue' ) ),
                    meta: { requiresAuth: false } 
                },*/
				/*	Catch Alls
                */

			]
		},
         {
            path: '*',
            redirect: { name: 'index' },
        },
        

	]
});

/* Para la autentificación se utiliza esta sección */
router.beforeEach((to, from, next) => {
	// you could define your own authentication logic with token

    if(to.matched.some(record => record.meta.requiresAuth)) {
        CerService.post('/login/admin/auth')
        .then(function (response) {
        
            let isAuthenticated
            if (response.res !== 0) {
                    isAuthenticated = true
                    store.dispatch('cambiarUser',response.user)

            } else {
                isAuthenticated = false
                store.dispatch('logoutUserAdmin')
            } 
            // check route meta if it requires auth or not
            store.dispatch('cambiarIsAuth',isAuthenticated)

            if(to.matched.some(record => record.meta.requiresAuth)) {
                    if (!isAuthenticated) {
                        router.push({ name: 'login' })
                        $(".preloader").fadeOut();

                    } else {
                        next()
                        $(".preloader").fadeOut();

                    }
            } else {
                if(String(to.name) == 'login' &&  isAuthenticated){
                    next({
                        path: '/admin',
                        params: { nextUrl: to.fullPath }
                    })
                    $(".preloader").fadeOut();

                }else {
                    next()
                    $(".preloader").fadeOut();

                }
            }

        })
        .catch(function () {
            if(to.matched.some(record => record.meta.requiresAuth)) { 
                    if(from.name != null)
                        {
                            router.push({ name: 'login' })
                            $(".preloader").fadeOut();


                        } else {
                            next({
                                path: '/admin',
                                params: { nextUrl: to.fullPath }
                            })
                            $(".preloader").fadeOut();
                        }
                }
            store.dispatch('logoutUserAdmin')

        });
    }else {
        // para rutas que se visualizan estrictamente si no se esta autentificado
            if(String(to.name) == 'login' ){
                CerService.post('/login/admin/auth')
                    .then(function (response) {
                    if(response.res !== 0){
                        next({
                            path: '/admin',
                            params: { nextUrl: to.fullPath }
                        })
                        $(".preloader").fadeOut();

                    }else {
                        next()
                        $(".preloader").fadeOut();
                    }
                })
                .catch(function () {
                    next({
                        path: '/admin',
                        params: { nextUrl: to.fullPath }
                    })
                    $(".preloader").fadeOut();
                });
                
            } else {
                next()
                $(".preloader").fadeOut();
            }
    
    }
  })
export default router;

/*export const routes = [
    { path: '/vue', component: Home, name: 'Home' },
    { path: '/vue/example', component: Example, name: 'Example' }
];
*/