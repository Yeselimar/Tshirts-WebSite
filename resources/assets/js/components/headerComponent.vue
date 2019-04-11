<style lang="scss" scope>
				li.logiform .droplogin:after{
					position: absolute;
					display: block;
					content: "";
					top: -15px;
					right: 20px;
					/*left: 190px;*/
					width: 0;
					height: 0;
					margin-left: 0px;
					overflow: hidden;
					border: 7px solid transparent;
					border-bottom-color: #ccc;
				}
				.droplogin .ingresar .input-group{
					margin-top: 20px;

				}
				.droplogin .ingresar .input-group input{
    				width: 100%;
					height: 44px;
					border: none;
					padding: 0 18px;
					background: #f0f0f0;
					border-radius: 40px;
					font-size: 14px;

				}

				.droplogin .ingresar .input-group .form-control:focus {
					color: #777777;
					outline: none;
					box-shadow: none;
				}

				.droplogin{
						padding: 17px 17px 17px 17px;
						min-width: 330px;
						border-radius: .5em;
						background: #fff;
						border-color: #ebebeb;
						z-index: 99999 !important;
						position: absolute;
						top: 2rem;
						/*left: -10.6rem;*/
						right: 0;
						border: solid 1px #ebebeb;
						-webkit-transition: all 0.4s;
						-o-transition: all 0.4s;
						transition: all 0.4s;
						-webkit-box-shadow: 2px 7px 20px rgba(0, 0, 0, 0.05);
						box-shadow: 2px 7px 20px rgba(0, 0, 0, 0.05);
				}
				@media (max-width: 768px) {
					.dropcart, .dropbag {
						min-width: 450px !important;
					}
				}
				@media (max-width: 490px) {
					.dropcart, .dropbag {
						min-width: 350px !important;
					}
				}
				@media (max-width: 400px) {
					.dropcart, .dropbag {
						min-width: 334px !important;
					}
				}
				/*
				@media only screen and (min-width: 1200px) and (max-width: 1315px) {
					.droplogin {
						min-width: 275px;
					}
				}
				*/
			.site-btn-login {
				display: inline-block;
				border: none;
				font-size: 14px;
				font-weight: 600;
				min-width: 119px;
				padding: 12px 20px 12px;
				border-radius: 50px;
				margin-top: 17px;
				background: #ef7a6e;
				color: #fff;
				line-height: normal;
				cursor: pointer;
				text-align: center;
			}
			a.link-login {
				display: block;
				position: relative;
				font-size: 14px;
				color: #8f8f8f;
				margin-bottom: 6px;
				cursor: pointer;
			}
			a.link-login:hover {
				font-weight: bold;
			}

			li.cartform .dropcart:after{
					position: absolute;
					display: block;
					content: "";
					top: -15px;
					right: 20px;
					/* left: 190px; */
					width: 0;
					height: 0;
					margin-left: 0px;
					overflow: hidden !important;
					border: 7px solid transparent;
					border-bottom-color: #ccc;
				}
				.dropcart{
					min-width: 550px;
					border-radius: .5em;
					background: #fff;
					border-color: #ebebeb;
					z-index: 99999 !important;
					position: absolute;
					top: 2rem;
					right: 0;
					/* left: -20.6rem; */
					border: solid 1px #ebebeb;
					max-height: 70vh !important;
					-webkit-transition: all 0.4s;
					-o-transition: all 0.4s;
					transition: all 0.4s;
					-webkit-box-shadow: 2px 7px 20px rgba(0, 0, 0, 0.05);
					box-shadow: 2px 7px 20px rgba(0, 0, 0, 0.05);
				}
				li.bagform .dropbag:after{
					position: absolute;
					display: block;
					content: "";
					top: -15px;
					right: 20px;
					/* left: 190px; */
					width: 0;
					height: 0;
					margin-left: 0px;
					overflow: hidden !important;
					border: 7px solid transparent;
					border-bottom-color: #ccc;
				}
				.dropbag{
					min-width: 550px;
					border-radius: .5em;
					background: #fff;
					border-color: #ebebeb;
					z-index: 99999 !important;
					position: absolute;
					top: 2rem;
					right: 0;
					/* left: -20.6rem; */
					border: solid 1px #ebebeb;
					max-height: 70vh !important;
					-webkit-transition: all 0.4s;
					-o-transition: all 0.4s;
					transition: all 0.4s;
					-webkit-box-shadow: 2px 7px 20px rgba(0, 0, 0, 0.05);
					box-shadow: 2px 7px 20px rgba(0, 0, 0, 0.05);



				}
				.js-header-main-cyo:hover{
					color: #ef7a6e !important
				}
				.border-li-barna-active {
					border: 2px solid black
				}
    
</style>
<template>
	<div>
		<div class="header-section header-barna-fixed"  @click="closeAll">
			<div class="header-top-barna">
				<div class="container">
					<div class="d-flex align-items-center">
						<div class="flex-basis-logo ">
							<!-- logo -->
							<a href="#" class="site-logo">
								<img :src="url+'/img/barna.jpg'" width="75" height="105" alt="">
							</a>
						</div>
						<div class="flex-basis-design">
							<ul class="d-flex sprd-header-barna">
								<li class="mr-2 sprd-li-barna" :class="[{'border-li-barna-active': isDesign}]">
									<a class="align-items-center d-flex js-header-main-cyo cursor" :class="[{'color-barna': isDesign}]"  @click.stop.prevent="designM(true)" >
										<div class="pr-2">
											<i class="fa fa-magic font-20" ></i>
										</div>
										<div class="sm-none-barna">
											<div class="title">
												Diseñar

											</div>
											<div class="description" :class="[{'color-black': isDesign}]">
												Hecho por ti
											</div>
										</div>
									</a>
								</li>
								<li class="mr-4 sprd-li-barna" :class="[{'border-li-barna-active': !isDesign}]">
										<a class="align-items-center d-flex js-header-main-cyo cursor"  :class="[{'color-barna': !isDesign}]" @click.stop.prevent="designM(false)" >
											<div class="pr-2">
												<i class="fa fa-money font-20" ></i>
											</div>
											<div class="sm-none-barna">
												<div class="title">
													Comprar
												</div>
												<div class="description" :class="[{'color-black': !isDesign}]">
													Hecho para ti
												</div>
											</div>
										</a>
									</li>
							</ul>
						</div>
						<div class="mr-4 flex-basis-search">
							<form class="header-search-form input-group ml-2 mr-2 form-search-barna">
								<div class="input-group-prepend cursor">
									<span class="input-group-text input-group-search-barna" id="basic-addon1"><i class="fa fa-filter" aria-hidden="true"></i></span>
								</div>
								<input type="text" v-model="search" class="input-search-barna form-control" placeholder="Buscar en Barna ....">
								<div class="input-group-append cursor" @click="searchM">
									<span class="input-group-text input-group-search-barna"><i class="fa fa-search" aria-hidden="true"></i></span>
								</div>
								<!--<button><i class="flaticon-search"></i></button>-->
							</form>
						</div>
						<div class="flex-basis-icons">
								<div class="user-panel">
									<ul class="navbar-nav d-inline">
										<li class="nav-item d-inline dropdown bagform position-relative">
											<div class="up-item pr-3">
												<div class="header-cart cursor"  @click.stop.prevent="showBagM">
													<i class="fa fa-shopping-bag"></i> 
													<span>0</span>
												</div>
											</div>
											<!-- drop bag -->
											<div class="dropbag " @click.stop.prevent="" v-if="showBag" :class="[{'zoomIn animated': showBag},{'zoomOut animated': showBagOut}]"
	>
												<div style="overflow: auto;max-height: 65vh;padding:17px">
													<h5 class="pb-2"><i class="fa fa-shopping-bag pr-2"></i>Cesta de Pedidos</h5>
													<table class="table table-hover">
														<thead>
															<tr>
																<th class="product-th text-center">Producto</th>
																<th class="quy-th text-center">Cant</th>
																<th class="total-th text-right">Precio</th>
																<th class="text-center"></th>

															</tr>
														</thead>
														<tfoot>
															<tr class="bg-gray">
																<td colspan="2"></td>
																<td class="total-col text-right">
																	<h5> TOTAL: $883</h5>
																</td>
																<td></td>
															</tr>
														</tfoot>
														<tbody>
															<tr>
																<td class="text-center">
																	<img :src="url+'/img/cart/2.jpg'" class="w-30" alt="">
																	<div class="pc-title">
																		<h6>Nev Print Absol</h6>
																	</div>
																</td>
																<td class="text-center">
																	<h6 class="inc qtybtn">x 1</h6>
																</td>
																<td class="text-right"><h6>$145.90</h6></td>
																<td class="text-center"><h5><i class="fa fa-trash cursor"></i></h5></td>

															</tr>
															<tr>
																<td class="text-center">
																	<img :src="url+'/img/cart/3.jpg'" class="w-30" alt="">
																	<div class="pc-title">
																		<h6>Swutter Print Dress</h6>
																	</div>
																</td>
																<td class="text-center">
																	<h6 class="inc qtybtn">x 1</h6>
																</td>
																<td class="text-right"><h6>$25.90</h6></td>
																<td class="text-center"><h5><i class="fa fa-trash cursor"></i></h5></td>

															</tr>
															
														</tbody>
													</table>
														<div class="d-flex justify-content-end">
															<input type="button"
																value="Procesar Pedido"
																class="site-btn-login float-right">
														</div>
													</div>
											</div> 
											<!-- end dropBag-->
										</li>
									</ul>

									<ul class="navbar-nav d-inline">
										<li class="nav-item d-inline dropdown cartform position-relative">
											<div class="up-item pr-3">
												<div class="header-cart cursor"  @click.stop.prevent="showCartM">
													<i class="fa fa-shopping-cart"></i>
													<span>0</span> 
												</div>
											</div>
											<div class="dropcart " @click.stop.prevent="" v-if="showCart" :class="[{'zoomIn animated': showCart},{'zoomOut animated': showCartOut}]">
												<!-- drop cart-->
												<div style="overflow: auto;max-height: 65vh;padding:17px">
													<h5 class="pb-2"><i class="fa fa-shopping-cart pr-2"></i>Carrito de Compra</h5>
													<table class="table table-hover">
														<thead>
															<tr>
																<th class="product-th text-center">Producto</th>
																<th class="quy-th text-center">Cant</th>
																<th class="total-th text-right">Precio</th>
																<th class="text-center"></th>

															</tr>
														</thead>
														<tfoot>
															<tr class="bg-gray">
																<td colspan="2"></td>
																<td class="total-col text-right">
																	<h5> TOTAL: $83</h5>
																</td>
																<td></td>
															</tr>
														</tfoot>
														<tbody>
															<tr>
																<td class="text-center">
																	<img :src="url+'/img/cart/1.jpg'" class="w-30" alt="">
																	<div class="pc-title">
																		<h6>Animal Print Dress</h6>
																	</div>
																</td>
																<td class="text-center">
																	<h6 class="inc qtybtn">x 1</h6>
																</td>
																<td class="text-right"><h6>$75.90</h6></td>
																<td class="text-center"><h5><i class="fa fa-trash cursor"></i></h5></td>

															</tr>
															<tr>
																<td class="text-center">
																	<img :src="url+'/img/cart/2.jpg'" class="w-30" alt="">
																	<div class="pc-title">
																		<h6>Text Print Dress</h6>
																	</div>
																</td>
																<td class="text-center">
																	<h6 class="inc qtybtn">x 1</h6>
																</td>
																<td class="text-right"><h6>$5.90</h6></td>
																<td class="text-center"><h5><i class="fa fa-trash cursor"></i></h5></td>

															</tr>
															
														</tbody>
													</table>
														<div class="d-flex justify-content-end">
															<input type="button"
																value="Comprar"
																class="site-btn-login float-right">
														</div>
													</div>
												<!--end dropcart -->
											</div> 
										</li>
									</ul>
									<ul class="navbar-nav d-inline">
										<li class="nav-item d-inline position-relative dropdown logiform">
											<div class="up-item pr-3">
												<div class="header-cart cursor"  @click.stop.prevent="showLoginM">
													<i class="fa fa-user"></i>
												</div>
											</div>
											<div class="droplogin " @click.stop.prevent="" v-if="showLogin" :class="[{'zoomIn animated': showLogin},{'zoomOut animated': showLoginOut}]">
												<h5 class="pb-2" style="border-bottom: 1px solid #cccccc;"><i class="fa fa-user pr-2"></i>Iniciar Sesion</h5>
												<div class="ingresar">
													<form>
														<div class=" form-email input-group">
															<input type="email"
																v-model="user.email"
																name="email"
																class="form-control"
																:placeholder="'Ingrese su email'"
															>
														</div>
														<div class=" form-password input-group">
															<input type="password"
																v-model="user.password"
																name="password"
																class="form-control"
																:placeholder="'Ingrese su contraseña'"
															>
														</div>

														<div class="d-flex justify-content-end">
															<input type="button"
																value="Ingresar"
																v-on:click="loginM()"
																class="site-btn-login float-right">
														</div>
														<div class="input-group remember justify-content-start text-left">
																<a href="#" class="link-login">Recuperar contraseña</a>
														</div>
														<div class="justify-content-start text-left">
																<a href="#" class="link-login">Registrarse</a>
														</div>
													</form>
												</div>
											</div> 
										</li>
									</ul>
								</div>
						</div>
					</div>
				</div>
			</div>
			<nav class="main-navbar text-center">
				<div class="container">
					<!-- menu -->
					<ul class="main-menu">
						<li><a href="#">Hombre</a></li>
						<li><a href="#">Mujer</a></li>
						<li><a href="#">Niño</a></li>
						<li><a href="#">Niña</a></li>
						<li><a href="#">Tazas</a></li>
						<li><a href="#">Buzo</a></li>

					</ul>
				</div>
			</nav>
		</div>
    	<div class="h-171"></div>
    </div>
</template>

<script>
    export default {
        name:'headerComponent',
        props: {
            url: {
                type: String,
                required: true
			},
			isdesignp: {
				type: Boolean,
				required: false,
				value: false,
			},
			isauthp: {
				type: Boolean,
				required: false,
				value: false
			},
			numcartp: {
				type: Number,
				required: false,
				value: 0
			},
			numbagp: {
				type: Number,
				required: false,
				value: 0
			},
			searchp: {
				type: String,
				required: false,
				value: ''
			},
			rubrop: {
				type: String,
				required: false,
				value: ''
			}
		},
		components: {
		},
		data() {
			return {
				user: {
					name: '',
					last_name: ''
				},
				search: this.searchp,
				rubro: this.rubrop,
				showLogin: false,
				isDesign: this.isdesignp,
				numBag: this.numbagp,
				numCart: this.numcartp,
				isAuth: this.isauthp,
				showCart: false,
				showBag: false,
				showLoginOut: false,
				showCartOut: false,
				showBagOut: false
			}
		},
		methods: {
			login() {
				console.log('esta entrando')
			},
			showBagM(){
				if(!this.showBag){
					this.showBagOut = false;
					this.showBag = true;
					this.showLoginOut = true;
					this.showCartOut = true;
					setTimeout(e => { 
						this.showLogin = false;
						this.showCart = false;
					},500)	
				}else {	
					this.showBagOut = true
					setTimeout(e => { 
						this.showBagOut=false
						this.showBag = false
					},500)	
				}

			},
			showCartM(){
				if(!this.showCart){
					this.showCartOut = false;
					this.showCart = true;
					this.showLoginOut = true;
					this.showBagOut = true;
					setTimeout(e => { 
						this.showLogin = false;
						this.showBag = false;
					},500)	
				}else {	
					this.showCartOut = true
					setTimeout(e => { 
						this.showCartOut=false
						this.showCart = false
					},500)	
				}

			},
			showLoginM(){
				if(!this.showLogin){
					this.showLoginOut = false;
					this.showLogin = true;
					this.showBagOut = true;
					this.showCartOut = true;
					setTimeout(e => { 
						this.showBag = false;
						this.showCart = false;
					},500)	
				}else {	
					this.showLoginOut = true
					setTimeout(e => { 
						this.showLoginOut=false
						this.showLogin = false
					},500)	
				}

			},
			closeAll(){
				this.showLoginOut=true
				this.showCartOut=true
				this.showBagOut=true
				setTimeout(e => { 
					this.showLoginOut=false
					this.showCartOut=false
					this.showBagOut=false
					this.showLogin = false
					this.showCart = false
					this.showBag = false
				},500)	
			},
			designM (cent){
				 this.$emit('designM',cent)
			},
			loginM (){
				this.$emit('loginM',this.user)
			},
			searchM () {
				var e = {
					search: this.search,
					rubro: this.rubro
				}
				this.$emit('searchM',e)
			}
		},
        created() {
			this.isDesign = this.isdesignp
			this.isAuth = this.isauthp
			this.numCart = this.numcartp
			this.search = this.searchp
			this.rubro = this. rubrop
			this.numBag = this.numbagp
		},
		 watch: {
    		isdesignp: function() {
				this.isDesign = this.isdesignp
			},
			isauthp: function() {
				this.isAuth = this.isauthp
			},
			numcartp: function() {
				this.numCart = this.numcartp
			},
			numbagp: function() {
				this.numBag = this.numbagp
			},
			searchp: function() {
				this.search = this.searchp
			},
			rubrop: function() {
				this.rubro = this.rubrop
			}

		 }
    }
</script>
