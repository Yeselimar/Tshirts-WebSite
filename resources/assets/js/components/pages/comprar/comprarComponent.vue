<style lang="scss" scope>

</style>
<template>
	<div>
		<migajas-component titulo="Comprar"></migajas-component>

		<!-- Comprar  -->

				<div class="container pt-4">
					<!--
					<div class="back-link">
						<a href="./category.html"> &lt;&lt; Back to Category</a>
					</div>
					-->
					<div class="row">
						<div class="col-lg-6">
							<div class="product-pic-zoom">
								<img class="product-big-img" :src="getUrl+imagenActual" alt="">
							</div>
							<div class="product-thumbs" tabindex="1" style=" margin-bottom: 10% ; overflow: hidden; outline: none;">
								<div class="product-thumbs-track">
									<div class="pt active" :data-imgbigurl="getUrl+'img/single-product/1.jpg'">
										<img :src="getUrl+'img/single-product/thumb-1.jpg'" alt="">
									</div>
									<div class="pt" :data-imgbigurl="getUrl+'img/single-product/2.jpg'">
										<img :src="getUrl+'img/single-product/thumb-2.jpg'" alt="">
									</div>
									<div class="pt" :data-imgbigurl="getUrl+'img/single-product/3.jpg'">
										<img :src="getUrl+'img/single-product/thumb-3.jpg'" alt="">
									</div>
									<div class="pt" :data-imgbigurl="getUrl+'img/single-product/4.jpg'">
										<img :src="getUrl+'img/single-product/thumb-4.jpg'" alt="">
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-6 product-details">
							<h2 class="p-title">{{articulo.nombre}}</h2>
							<h3 class="p-price">{{precioActual}}$</h3>
							<div v-if="(articulo.cantidad>0)">
							<h4 class="p-stock"><span>Disponible</span></h4></div>
							<div v-else><h4 class="p-stock"> <span>No Disponible</span></h4></div>
							<div class="align-items-center d-flex form__field">
								<div class="align-items-center d-flex"><p>Color:</p></div>
								<swatches
								:swatch-style="{width: '27px', height: '27px'}"
								:trigger-style="{width: '27px', height: '27px', margin: '5px', border: '2px solid #414141'}"
								v-model="colorActual"
								:colors="coloresGenerales"
								row-length="4"
								shapes="circles"
								show-border popover-to="left"
								@input="info_actual">
								</swatches>
							</div>
							<div class="fw-size-choose">
								<p>Talles</p>
								<div v-for="(talle, i) in tallesActuales" class="sc-item">
									<input type="radio" name="sc" id="xs-size">
									<label for="xs-size">{{talle}}</label>
								</div>

							</div>
							<div class="quantity">
								<p>Cantidad</p>
			                    <div class="pro-qty"><input type="text" value="1"></div>
			                </div>

						<!-- 	<button class="btn-upload" @click="procesar_pago()"> Pagar</button> -->
							<div id="accordion" class="accordion-area">
								<div class="panel">
									<div class="panel-header" id="headingOne">
										<button class="panel-link active" data-toggle="collapse" data-target="#collapse1" aria-expanded="true" aria-controls="collapse1">Información</button>
									</div>
									<div id="collapse1" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
										<div class="panel-body">
											<p>{{articulo.descripcion}}</p>
										</div>
									</div>
								</div>
								<!-- <div class="panel">
									<div class="panel-header" id="headingThree">
										<button class="panel-link" data-toggle="collapse" data-target="#collapse3" aria-expanded="false" aria-controls="collapse3">Politica de Envío</button>
									</div>
									<div id="collapse3" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
										<div class="panel-body">
											<h4>Entrega estimada:</h4>
											<p>Costo de Envío<br>Home Delivery <span>3 - 4 days</span></p>
											<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra tempor so dales. Phasellus sagittis auctor gravida. Integer bibendum sodales arcu id te mpus. Ut consectetur lacus leo, non scelerisque nulla euismod nec.</p>
										</div>
									</div>
								</div> -->
							</div>
							<div class="d-flex justify-content-center">
							<button class="btn-carrito" @click=addCart(articuloId)> Añadir al carrito</button>
							</div>
						</div>
					</div>
				</div>

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
	import Swatches from 'vue-swatches'
	import "vue-swatches/dist/vue-swatches.min.css"

	export default {
        name:'procesarcarritoComponent',
        components:
        {
        	migajasComponent,
			prodDestacadosComponent,
			Swatches,
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
			setTimeout(e =>{
			this.tallesActuales=this.tallesGenerales
			this.precioActual=this.articulo.precioGeneral
			},1500)
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
				//nuevas
				imagenesarticulos: [],
				tallesGenerales: [],
				coloresGenerales: [],
				cantidadUsada: '',
				tallesColores:[],
				imagenColor:[],
				colorActual: '',
				imagenActual:'',
				tallesActuales:[],
				precioActual:'',
				preciosActuales:[],
				talleActual:'',
				auxTalles: false,
			/* 	varianteDeColorAux: [], */
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
			info_actual(){

				this.tallesActuales=[]
				this.preciosActuales=[]
				this.auxTalles=false

				//Buscar relacion Imagen-color
				this.imagenColor.forEach(function(file,i){
					if(file.color.color==this.colorActual){
						this.imagenActual=file.file.url
					//	auxImagen=true
					}
				},this)
				//buscar relacion talle-color
				this.tallesColores.forEach(function(file,i){
					console.log('Comparando: ', file.colorDeVariante.color, 'con', this.colorActual)
					 if(file.colorDeVariante.color==this.colorActual){
						this.preciosActuales.push(file.precioDeVariante)
						this.precioActual=this.articulo.precioGeneral
						//this.tallesActuales[i]=file.TalleDeVariante.valor
						this.tallesActuales.push(file.TalleDeVariante.valor)
						this.auxTalles=true
					}
				},this)

				if(this.auxTalles===false){
					//console.log('ajaa', this.tallesGenerales)
					this.tallesActuales=this.tallesGenerales
				}

				console.log('se esta guardando:', this.tallesActuales)
			},
			info_articulo(id){

				CerService.post("/articulo/"+id+"/seleccionado")
				.then(response =>
				{
				if(response.res == 1){
				//console.log(response.articulo)
					response.articulo.imagenesarticulos.forEach(function(file,i){
						let aux = {
								id: file.id,
								thumb: file.url,
								url: file.url,
							}
						this.imagenesarticulos.push({...aux})
					},this)
					this.articulo.nombre = response.articulo.nombre
					this.articulo.marca = response.articulo.marca
					this.articulo.descripcion = response.articulo.descripcion
					this.selectedRubro = response.articulo.rubros
					this.articulo.publicado = response.articulo.publicado
					this.articulo.destacado = response.articulo.destacado
					if(response.articulo.tipo == 'ropa') {
						this.selectedTipo = 'Ropa'
					} else {
						this.selectedTipo = 'Otros'
					}
					this.articulo.precioGeneral = response.articulo.precio_general
					this.maskAmount = response.articulo.mask_precio
					this.maskCantidad = response.articulo.mask_cantidad
					this.articulo.otros = response.articulo.otros
					this.tallesGenerales = response.articulo.talles
					//this.coloresGenerales = response.articulo.colores

					response.articulo.colores.forEach(function(file,i){
						//this.coloresGenerales[i]=file.color
						this.coloresGenerales.push(file.color)


					},this)
					/* setTimeout(e =>{
					this.colorActual=coloresGenerales[0]
					},500) */
					console.log('COLORES:', this.coloresGenerales)
					this.articulo.cantidad = parseInt(response.articulo.cantidad)
					if(response.articulo.tipo_cantidad == 'por_variante') {
						this.cantidadUsada = 'Por Variante'
					} else {
						this.cantidadUsada = 'General'
					}

					//talles-colores
					response.articulo.tallescolores.forEach(function(file,i){
						let aux = {
							colorDeVariante: file.color,
							TalleDeVariante: (this.selectedTipo === 'Ropa') ? file.talle: {},
							cantidadDeVariante: file.cantidad,
							precioDeVariante: parseFloat(file.precio)
						}
						this.tallesColores.push(
						{...aux}
						)
					},this)
					let idS = 0
					//Imagenes-Colores:
					response.articulo.imagenes_colores.forEach(function(file,i){
						let aux = {
							color: file.color,
							file: {
								id: file.id,
								url: file.url,
							},
							es_principal: file.principal,
							posicionRelacion: {
								id:'frontal',
								nombre: 'Frontal'
							}
						}
						const resultado = this.imagenesarticulos.findIndex( fileIC => fileIC.id === aux.file.id );
						/* if(resultado !== -1){
							this.imagenesarticulos[resultado].selectedImagen = true
						} */
						this.imagenColor.push({...aux})
						if(file.principal){

							idS = i
							this.imagenActual=file.url
							this.colorActual=file.color.color
							console.log('si es principal:',this.imagenActual)
						}
					},this)
					/* if(response.articulo.imagenes_colores.length){
						setTimeout(e => {
						$("#radio_"+idS).prop("checked", true);
						},10)
					}
					this.isLoading = false */
					}else{
					this.msgAlert(response.msg,'error')
					this.$router.push({ name: 'no.encontrado' });
					}
				})
				.catch(error => {
					console.log('Ha ocurrido un error inesperado')

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