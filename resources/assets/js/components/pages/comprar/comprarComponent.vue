<style lang="scss" scope>

</style>
<template>
	<div>
		<migajas-component titulo="Comprar"></migajas-component>

		<!-- Comprar  -->
			<section class="product-section">
				<div class="container">
					<!--
					<div class="back-link">
						<a href="./category.html"> &lt;&lt; Back to Category</a>
					</div>
					-->
					<div class="row">
						<div class="col-lg-6">
							<div class="product-pic-zoom">
								<img class="product-big-img" :src="getUrl+'img/single-product/1.jpg'" alt="">
							</div>
							<div class="product-thumbs" tabindex="1" style="overflow: hidden; outline: none;">
								<div class="product-thumbs-track">
									<div class="pt active" :data-imgbigurl="getUrl+'img/single-product/1.jpg'"><img :src="getUrl+'img/single-product/thumb-1.jpg'" alt=""></div>
									<div class="pt" :data-imgbigurl="getUrl+'img/single-product/2.jpg'"><img :src="getUrl+'img/single-product/thumb-2.jpg'" alt=""></div>
									<div class="pt" :data-imgbigurl="getUrl+'img/single-product/3.jpg'"><img :src="getUrl+'img/single-product/thumb-3.jpg'" alt=""></div>
									<div class="pt" :data-imgbigurl="getUrl+'img/single-product/4.jpg'"><img :src="getUrl+'img/single-product/thumb-4.jpg'" alt=""></div>
								</div>
							</div>
						</div>
						<div class="col-lg-6 product-details">
							<h2 class="p-title">{{articulo.nombre}}</h2>
							<h3 class="p-price">$39.90</h3>
							<h4 class="p-stock">Available: <span>In Stock</span></h4>
							<div class="p-rating">
								<i class="fa fa-star-o"></i>
								<i class="fa fa-star-o"></i>
								<i class="fa fa-star-o"></i>
								<i class="fa fa-star-o"></i>
								<i class="fa fa-star-o fa-fade"></i>
							</div>
							<div class="p-review">
								<a href="">3 reviews</a>|<a href="">Add your review</a>
							</div>
							<div class="fw-size-choose">
								<p>Size</p>
								<div class="sc-item">
									<input type="radio" name="sc" id="xs-size">
									<label for="xs-size">32</label>
								</div>
								<div class="sc-item">
									<input type="radio" name="sc" id="s-size">
									<label for="s-size">34</label>
								</div>
								<div class="sc-item">
									<input type="radio" name="sc" id="m-size" checked="">
									<label for="m-size">36</label>
								</div>
								<div class="sc-item">
									<input type="radio" name="sc" id="l-size">
									<label for="l-size">38</label>
								</div>
								<div class="sc-item disable">
									<input type="radio" name="sc" id="xl-size" disabled>
									<label for="xl-size">40</label>
								</div>
								<div class="sc-item">
									<input type="radio" name="sc" id="xxl-size">
									<label for="xxl-size">42</label>
								</div>
							</div>
							<div class="quantity">
								<p>Quantity</p>
			                    <div class="pro-qty"><input type="text" value="1"></div>
			                </div>
						<button class="btn-upload" @click=addCart(articuloId)> Añadir al carrito</button>
						<!-- 	<button class="btn-upload" @click="procesar_pago()"> Pagar</button> -->
							<div id="accordion" class="accordion-area">
								<div class="panel">
									<div class="panel-header" id="headingOne">
										<button class="panel-link active" data-toggle="collapse" data-target="#collapse1" aria-expanded="true" aria-controls="collapse1">information</button>
									</div>
									<div id="collapse1" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
										<div class="panel-body">
											<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra tempor so dales. Phasellus sagittis auctor gravida. Integer bibendum sodales arcu id te mpus. Ut consectetur lacus leo, non scelerisque nulla euismod nec.</p>
											<p>Approx length 66cm/26" (Based on a UK size 8 sample)</p>
											<p>Mixed fibres</p>
											<p>The Model wears a UK size 8/ EU size 36/ US size 4 and her height is 5'8"</p>
										</div>
									</div>
								</div>
								<div class="panel">
									<div class="panel-header" id="headingTwo">
										<button class="panel-link" data-toggle="collapse" data-target="#collapse2" aria-expanded="false" aria-controls="collapse2">care details </button>
									</div>
									<div id="collapse2" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
										<div class="panel-body">
											<!-- :src="url+image"-->

											<img :src="getUrl+'img/cards.png'" alt="">
											<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra tempor so dales. Phasellus sagittis auctor gravida. Integer bibendum sodales arcu id te mpus. Ut consectetur lacus leo, non scelerisque nulla euismod nec.</p>
										</div>
									</div>
								</div>
								<div class="panel">
									<div class="panel-header" id="headingThree">
										<button class="panel-link" data-toggle="collapse" data-target="#collapse3" aria-expanded="false" aria-controls="collapse3">shipping & Returns</button>
									</div>
									<div id="collapse3" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
										<div class="panel-body">
											<h4>7 Days Returns</h4>
											<p>Cash on Delivery Available<br>Home Delivery <span>3 - 4 days</span></p>
											<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra tempor so dales. Phasellus sagittis auctor gravida. Integer bibendum sodales arcu id te mpus. Ut consectetur lacus leo, non scelerisque nulla euismod nec.</p>
										</div>
									</div>
								</div>
							</div>
							<div class="social-sharing">
								<a href=""><i class="fa fa-google-plus"></i></a>
								<a href=""><i class="fa fa-pinterest"></i></a>
								<a href=""><i class="fa fa-facebook"></i></a>
								<a href=""><i class="fa fa-twitter"></i></a>
								<a href=""><i class="fa fa-youtube"></i></a>
							</div>
						</div>
					</div>
				</div>
			</section>
		<!-- Comprar end -->


		<!-- Productos destacados -->
			<prod-destacados-component></prod-destacados-component >
		<!-- Productos destacados-->

	</div>
</template>

<script>
	import migajasComponent from "../../../components/layouts/migajasComponent.vue";
	import prodDestacadosComponent from "../../../components/pages/share/prodDestacadosComponent.vue"
	import { mapGetters } from 'vuex'
	import CerService from "../../../plugins/CerService";

	export default {
        name:'procesarcarritoComponent',
        components:
        {
        	migajasComponent,
        	prodDestacadosComponent
		},
		created() {
		console.log('hello ili created')
		let element = document.getElementById("header-top");
			var options = {
			offset: 0,
			force: true
			};
		this.$scrollTo(element, 0, options);
		this.articuloId=this.$route.params.id
		this.info_articulo(this.$route.params.id)

		},
		computed: {
			...mapGetters(['getIsDesign', 'getRubro', 'getSearch','getUser','getIsAuth','getCart','getBag','getUrl']),
		},

        data() {
			return {
				isLoading: false,
				articuloId: '',
				url_pago:'',
				isLoading: false,
				showNav: true,
				selectedTipo: "",
				maskCantidad: "",
				maskAmount: '',
				articulo: {
					nombre: "",
					marca: "",
					precioGeneral: 0.00,
					otros: '',
					imagenes: [],
					mask_precio: '',
					rubros: [],
					talles: [],
					colores: [],
					talles_colores: [],
					imagenes_colores: [],
					tipo: '',
					tipo_cantidad: '',
					cantidad: 0,
					descripcion: '',
					destacado: false,
					publicado:false
				},
            }
        },
        methods:
        {
			procesar_pago(){

				CerService.post("/pagar")
				.then(response => {
				this.url_pago=response.pagar
					window.open(this.url_pago , "_blank");
				})
				.catch(error => {
					this.mensaje("error","Ha ocurrido un error inesperado");
				});
			},
			info_articulo(id){
				CerService.post("/articulo/"+id+"/seleccionado")
				.then(response =>
				{
					if(response.res == 1){
					console.log(response.articulo)
					response.articulo.imagenesarticulos.forEach(function(file,i){
						let aux = {
								id: file.id,
								thumb: file.url,
								url: file.url,
								isSaved: true,
								selectedImagen:false
							}
						this.imagenesarticulos.push({...aux})
					},this)
					this.articulo.nombre = response.articulo.nombre
					this.articulo.marca = response.articulo.marca
					this.articulo.descripcion = response.articulo.descripcion

					this.articulo.publicado = response.articulo.publicado

					if(response.articulo.tipo == 'ropa') {
						this.selectedTipo = 'Ropa'
					} else {
						this.selectedTipo = 'Otros'
					}
					this.articulo.precioGeneral = response.articulo.precioGeneral
					this.maskAmount = response.articulo.mask_precio
					this.maskCantidad = response.articulo.mask_cantidad
					this.articulo.otros = response.articulo.otros
					this.selectedTallas = response.articulo.talles
					this.selectedColores = response.articulo.colores
					this.articulo.cantidad = parseInt(response.articulo.cantidad)
					if(response.articulo.tipo_cantidad == 'por_variante') {
						this.selectedCantidad = 'Por Variante'
					} else {
						this.selectedCantidad = 'General'
					}
					console.log(response.articulo.tallescolores)
					response.articulo.tallescolores.forEach(function(file,i){
					console.log(file)
						let aux = {
							selectedColorVariante: file.color,
							selectedTalleVariante: (this.selectedTipo === 'Ropa') ? file.talle: {},
							/* colorVarianteAux: {
							colorOld: '',
							colorNew: '',
							}, */
							cantidadVariante: file.cantidad,
							precioVariante: parseFloat(file.precio)

						}
						console.log(aux)
						this.filesVariantes.push(
						{...aux}
						)
						console.log(this.filesVariantes)
					},this)
					console.log(this.filesVariantes)
					let idS = 0
					response.articulo.imagenes_colores.forEach(function(file,i){
						let aux = {
							selectedColorRelacion: file.color,
							file: {
								id: file.id,
								thumb: file.url,
								url: file.url,
								isSaved: true,
								selectedImagen:true
							},
							es_principal: file.principal,
							posicionRelacion: {
								id:'frontal',
								nombre: 'Frontal'
							}
							}
						const resultado = this.imagenesarticulos.findIndex( fileIC => fileIC.id === aux.file.id );
						if(resultado !== -1){
							this.imagenesarticulos[resultado].selectedImagen = true
						}
						this.filesImagesColor.push(
						{...aux}
						)
						if(file.principal){
							idS = i
						}
					},this)
					if(response.articulo.imagenes_colores.length){
						setTimeout(e => {
						$("#radio_"+idS).prop("checked", true);
						},10)
					}
					this.isLoading = false
					}else{
					this.msgAlert(response.msg,'error')
					this.$router.push({ name: 'no.encontrado' });
					}
				})
				.catch(error => {
					console.log('Ha ocurrido un error inesperado')
					this.isLoading = false
				});

			},
			addCart (product){
				if(this.getIsAuth){
					this.isLoading = true
						this.$store.dispatch('actionAddCart',{...product}).then((res)=>{
						this.isLoading = false
							if (res === 1) {
								this.$swal
								.mixin({
								toast: true,
								position: "top-end",
								showConfirmButton: false,
								timer: 4000
								})
								.fire({
								type: "success",
								title: "El Producto fue agregado a su carrito exitosamente"
								});
							} else {
							this.$swal
								.mixin({
								toast: true,
								position: "top-end",
								showConfirmButton: false,
								timer: 4000
								})
								.fire({
								type: "error",
								title: "Ha ocurrido un error al añadir al carrito"
								});
							}
						})
				} else {
						this.$swal
						.mixin({
						toast: true,
						position: "top-end",
						showConfirmButton: false,
						timer: 4000
						})
						.fire({
						type: "warning",
						title: "Debe estar autentificado para agregar al carrito"
						});
				}
			},
		},

    }
</script>