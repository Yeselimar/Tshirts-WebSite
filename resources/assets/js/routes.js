import Vue from 'vue'
import VueRouter from 'vue-router'
import CerService from './plugins/CerService';
import store from './indexStore';
import Config from './config';


Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '*',
			redirect: { name: 'home' },
		},
		{
			path: Config.env.base,
			component: Vue.component( 'App', require( './components/App.vue' ) ),
			children: [
				{
					path: '',
					redirect: 'home'
				},
				{
					path: '',
					name: 'home',
					default: true,
					component: Vue.component( 'Home', require( './components/pages/home/homeComponent.vue' ) ),

				},
				{
					path: 'example',
					name: 'example',
					component: Vue.component( 'Example', require( './components/Example.vue' ) ),
				},
				{
					path: 'example2',
					name: 'example2',
					component: Vue.component( 'Example2', require( './components/Example2.vue' ) ),
					meta: { requiresAuth: true }
				},
				{
					path: 'register',
					name: 'register',
					component: Vue.component( 'Register', require( './components/pages/register/registerComponent.vue' ) ),
					meta: { requiresAuth: false }

				},
				{
					path: 'rubros',
					name: 'rubros',
					component: Vue.component( 'Rubros', require( './components/pages/rubros/rubrosComponent.vue' ) ),
					meta: { requiresAuth: false }

				},
				{
					path: 'procesar-carrito',
					name: 'procesar-carrito',
					component: Vue.component( 'Procesarcarrito', require( './components/pages/procesarcarrito/procesarcarritoComponent.vue' ) ),
					meta: { requiresAuth: false }

				},
				{
					path: 'pedido-generado',
					name: 'pedido-generado',
					component: Vue.component( 'Pedidogenerado', require( './components/pages/pedidogenerado/pedidogeneradoComponent.vue' ) ),
					meta: { requiresAuth: false }

				},
				{
					path: 'disenar/:id',
					name: 'disenar',
					component: Vue.component( 'Disenar', require( './components/pages/disenar/disenarComponent.vue' ) ),
					meta: { requiresAuth: true }
				},
				{
					path: 'detalle/prodComprar/:id',
					name: 'detalleComprar',
					component: Vue.component( 'DetalleComprar', require( './components/pages/comprar/comprarComponent.vue' ) ),
					meta: { requiresAuth: false }
				},
				//Se crea esta ruta por si hay conflicto.
				{
					path: 'detalle/prodComprar/:id/otro',
					name: 'detalleComprar',
					component: Vue.component( 'DetalleComprar2', require( './components/pages/comprar/comprarComponent2.vue' ) ),
					meta: { requiresAuth: false }
				},
				/*
					Catch Alls
				*/
				{ path: '_=_', redirect: Config.env.base }

			]
		},
	]
});

/* Para la autentificaci??n se utiliza esta secci??n */
router.beforeEach((to, from, next) => {
	// you could define your own authentication logic with token
	$("#preloader").show()
	$(".loading").show()
	if(to.matched.some(record => record.meta.requiresAuth)) {
				CerService.post('/login/auth')
				.then(function (response) {

					let isAuthenticated
					if (response.res != 0) {
						isAuthenticated = true
						store.dispatch('cambiarUser',response.user)
					} else {
						isAuthenticated = false
						store.dispatch('logoutUser')
					}
					store.dispatch('cambiarIsAuth',isAuthenticated)
					// check route meta if it requires auth or not
					$(".loading").fadeOut();
					$("#preloader").delay(400).fadeOut("slow");
					if(to.matched.some(record => record.meta.requiresAuth)) {
						if (!isAuthenticated) {
							if(from.name != null)
							{
								next({
									path: from.path,
									params: { nextUrl: to.fullPath }
								})
							} else {
								next({
									path: Config.env.base,
									params: { nextUrl: to.fullPath }
								})
							}

						} else {
							/*if(store.getters.getUser.rol === 'user'){ // si esta autentificado y adem??s es un usuario
							next()
							} else { // sino ir a rutas bases
							if(from.name != null)
								{
									next({
										path: from.path,
										params: { nextUrl: to.fullPath }
									})
								} else {
									next({
										path: Config.env.base,
										params: { nextUrl: to.fullPath }
								})
									}

							}
								*/
								next()

						}
					} else {
						if(String(to.name) == 'register' &&  isAuthenticated){
							next({
								path: Config.env.base,
								params: { nextUrl: to.fullPath }
							})
						}else {
							next()
						}
					}

				})
				.catch(function () {
					$(".loading").fadeOut();
					$("#preloader").delay(400).fadeOut("slow");
					if(to.matched.some(record => record.meta.requiresAuth)) {
						if(from.name != null)
							{
								next({
									path: from.path,
									params: { nextUrl: to.fullPath }
								})
							} else {
								next({
									path: Config.env.base,
									params: { nextUrl: to.fullPath }
								})
							}
					}
					store.dispatch('logout')
				});

		} else {
			// para rutas que se visualizan estrictamente si no se esta autentificado
			if(String(to.name) == 'register' ){
				CerService.post('/login/auth')
					.then(function (response) {
					if(response.res !== 0){
						next({
							path: Config.env.base,
							params: { nextUrl: to.fullPath }
						})
					}else {
						next()
					}
					$(".loading").fadeOut();
					$("#preloader").delay(400).fadeOut("slow");
				})
				.catch(function () {
					next({
						path: Config.env.base,
						params: { nextUrl: to.fullPath }
					})

					$(".loading").fadeOut();
					$("#preloader").delay(400).fadeOut("slow");
				});

			} else {
				next()
				$(".loading").fadeOut();
				$("#preloader").delay(400).fadeOut("slow");
			}

		}

})

export default router;

/*export const routes = [
	{ path: '/vue', component: Home, name: 'Home' },
	{ path: '/vue/example', component: Example, name: 'Example' }
];
*/