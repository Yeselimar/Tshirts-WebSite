import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './indexStoreBack';
import CerService from '../plugins/CerService';
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
	routes: [
        {
            path: '*',
            redirect: { name: 'index' },
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
					meta: { requiresAuth: true } 
                },
				{
					path: 'login',
					name: 'login',
					component: Vue.component( 'Login', require( './components/pages/loginComponent.vue' ) ),
				},
				/*	Catch Alls
                */
                { path: '_=_', redirect: '/admin/' }

			]
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
            } else {
                isAuthenticated = false
                store.dispatch('logoutUserAdmin')
            } 
            // check route meta if it requires auth or not
            if(to.matched.some(record => record.meta.requiresAuth)) {
                        if (!isAuthenticated) {
                            if(from.name != null)
                            {
                                next({
                                    path: to.fullPath+'login',
                                    params: { nextUrl: to.fullPath }
                                })
                            } else {
                                next({
                                    path: '/admin',
                                    params: { nextUrl: to.fullPath }
                                })
                            }

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

        })
        .catch(function () {
            if(to.matched.some(record => record.meta.requiresAuth)) { 
                    if(from.name != null)
                        {
                            next({
                                path: from.path+'login',
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
        });
    }else {
        next()
    
    }

  })
  
export default router;

/*export const routes = [
    { path: '/vue', component: Home, name: 'Home' },
    { path: '/vue/example', component: Example, name: 'Example' }
];
*/