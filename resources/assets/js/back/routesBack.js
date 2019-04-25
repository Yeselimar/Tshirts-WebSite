import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './indexStoreBack';
import CerService from '../plugins/CerService';
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
	routes: [
       
        {
                path: 'admin/login',
                name: 'login',
                component: Vue.component( 'Login', require( './components/pages/loginComponent.vue' ) ),
                meta: { requiresAuth: false } 
        },

		{
			path: '/admin/',
			component: Vue.component( 'Back', require( './components/Back.vue' ) ),
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
					meta: { requiresAuth: false } 
                },
				
                {
                    path: 'rubros',
                    name: 'rubros',
                    component: Vue.component( 'Rubros', require( './components/pages/rubros/rubrosComponent.vue' ) ),
                    meta: { requiresAuth: false } 
                },
                {
                    path: 'grupos',
                    name: 'grupos',
                    component: Vue.component( 'Grupos', require( './components/pages/grupos/gruposComponent.vue' ) ),
                    meta: { requiresAuth: false } 
                },
                {
                    path: 'caracteristicas',
                    name: 'caracteristicas',
                    component: Vue.component( 'Caracteristicas', require( './components/pages/caracteristicas/caracteristicasComponent.vue' ) ),
                    meta: { requiresAuth: false } 
                },
				/*	Catch Alls
                */
                { path: '_=_', redirect: '/' }
			]
		},
         {
            path: '*',
            redirect: { name: 'login' },
        },

	]
});

/* Para la autentificación se utiliza esta sección */
/*router.beforeEach((to, from, next) => {
	// you could define your own authentication logic with token
    console.log(to)
    console.log(from)
    console.log(next)
    $(".preloader").show();
    console.log('algo pasa')
    if(to.matched.some(record => record.meta.requiresAuth)) {
        console.log('por aqui pasooo')
        CerService.post('/login/admin/auth')
        .then(function (response) {
        
            let isAuthenticated
            if (response.res !== 0) {
                    isAuthenticated = true
            } else {
                isAuthenticated = false
                store.dispatch('logoutUserAdmin')
            } 
            // check route meta if it requires auth or not
            if(to.matched.some(record => record.meta.requiresAuth)) {
                    if (!isAuthenticated) {
                        next({
                            path: '/admin/login',
                            params: { nextUrl: to.fullPath }
                        })
                    } else {
                        next()
                    }
            } else {
                if(String(to.name) == 'login' &&  isAuthenticated){
                    next({
                        path: '/admin',
                        params: { nextUrl: to.fullPath }
                    })

                }else {
                    next()
                }
            }
            $(".preloader").fadeOut();

        })
        .catch(function () {
            if(to.matched.some(record => record.meta.requiresAuth)) { 
                    if(from.name != null)
                        {
                            next({
                                path: '/admin/login',
                                params: { nextUrl: to.fullPath }
                            })
                        } else {
                            next({
                                path: '/admin',
                                params: { nextUrl: to.fullPath }
                            })
                        }
                }
               
            store.dispatch('logoutUserAdmin')
            $(".preloader").fadeOut();

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
                    }else {
                        next()
                    }
                    $(".preloader").fadeOut();
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
  })*/
export default router;


/*export const routes = [
    { path: '/vue', component: Home, name: 'Home' },
    { path: '/vue/example', component: Example, name: 'Example' }
];
*/