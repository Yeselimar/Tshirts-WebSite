<style>
	.product-details .p-price
	{
		margin-bottom: 0px !important;
	}
	.btn-circular-barna-color
	{
		width: 33px;
		height: 33px;
		font-size: 12px;
		border-radius: 25px;
		border: none;
		margin-right: 5px;
		border: 2px solid #E5E5E5;
	}
	.btn-circular-barna-talle
	{
		width: 33px;
		height: 33px;
		font-size: 12px;
		border-radius: 25px;
		border: none;
		margin-right: 5px;
		border: 2px solid #E5E5E5;
		background-color: #fff;
	}
	.border-barna-color
	{
		border: 2px solid #414141 !important;
	} 
	.border-barna-talle
	{
		border: 2px solid #414141 !important;
	}
	.input-cantidad-barna
	{
		height: 33px;
	    line-height: 40px;
	    padding: 0;
	    font-size: 14px;
	    text-align: center;
	    background-color: #e5e5e5;
	    width: 65px;
	    border: 1px solid #424242;
	    border-radius: 25px;
	    margin-right: 5px;
	    padding: 10px;
	    padding-top: 10px;
	}
	.color-indicador
	{
		border-radius: 25px;
		height: 25px;
		width: 25px;
		padding-top: 2px;
	    padding-bottom: 2px;
	    padding-left: 1px;
	    padding-right: 1px;
	    border: 1px solid #E5E5E5;
	}
	.accordion-area
	{
		margin-top: 25px !important;
		margin-bottom: 15px !important;
	}
	.badge-barna
	{
		border:1px solid #9E9E9E !important;
		background-color: #e5e5e5 !important;
		color: #424242 !important;
	}
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

							<template v-for="imagen in articulo.imagenes_colores">
								<div class="pt " :data-imgbigurl="getUrl+imagen.url" @click="cambioImagenPrincipal(imagen)" :class="{ active: imagen.caracteristica_id === color_seleccionado.id }">
									<img :src="getUrl+imagen.url" :alt="articulo.nombre">
								</div>
							</template>
							
							<!-- 
							:class="{ active: imagen.caracteristica_id === color_seleccionado.id }"
							-->

							<!--<div class="pt active" :data-imgbigurl="getUrl+'img/single-product/2.jpg'">
								<img :src="getUrl+'img/single-product/thumb-2.jpg'" alt="">
							</div>
							<div class="pt" :data-imgbigurl="getUrl+'img/single-product/3.jpg'">
								<img :src="getUrl+'img/single-product/thumb-3.jpg'" alt="">
							</div>
							<div class="pt" :data-imgbigurl="getUrl+'img/single-product/4.jpg'">
								<img :src="getUrl+'img/single-product/thumb-4.jpg'" alt="">
							</div>-->
						</div>
					</div>
				</div>

				<div class="col-lg-6 product-details">
					<h2 class="p-title">{{articulo.nombre}}</h2>
					<h3 class="p-price">{{formatearmoneda(precio_articulo)}}$</h3> 
					
					<br>

					<div v-if="(articulo.cantidad>0)">
					<h4 class="p-stock"><span>Disponible</span></h4></div>
					<div v-else><h4 class="p-stock"> <span>No Disponible</span></h4></div>

					<div class="fw-size-choose">
						<p>Cantidad </p>
	                    <input type="number" min="1" v-model="cantidad_articulo" class="input-cantidad-barna">
	                </div>

					<div class="fw-size-choose">
						<p>Colores</p>
						<template v-for="color in articulo.colores" >
							<button :style="{ 'background-color': color.color + '!important'}" class="btn-circular-barna-color" @click="cambiaColor(color)" :id="color.id">
							</button type="button">
						</template>
					</div>
					
					<!--Color Seleccionado: {{color_seleccionado}}-->

					<div class="fw-size-choose">
						<p>Talles</p>
						<template v-for="talle in talles" >
							<button class="btn-circular-barna-talle" @click="cambiaTalle(talle)" :id="talle.id">
								{{talle.valor}}
							</button type="button">
						</template>
						<template v-if="talles.length==0">
							<div style="color:##616161;height: 33px;font-size: 12px;padding-top: 12px;">Talles disponibles según el color</div>
						</template>
					</div>

					<div>
						<button class="btn-carrito" @click="confirmarcarrito()"> Añadir al carrito</button>
					</div>

					<div>
						<span class="badge badge-pill badge-barna">Precio varía según talle y color</span>
					</div>

					<!--Talle Seleccionado: {{talle_seleccionada}}-->

					<!--
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
							<input type="radio" name="sc" :id="talle.id" :value="talle.id" v-model="talle_seleccionada">
							<label for="talle" >{{talle.valor}}</label>
						</div>
					</div>

					<div v-for="(talle, i) in tallesActuales" >
						<input type="radio" name="talle" id="talle" :value="talle.id">
						<label for="talle" >{{talle.valor}}</label>
					</div>
					Talle seleccionada:{{talle_seleccionada}}
					
					-->

					<!-- 	<button class="btn-upload" @click="procesar_pago()"> Pagar</button> -->

					<div id="accordion" class="accordion-area">
						<div class="panel">
							<div class="panel-header" id="headingOne">
								<button class="panel-link active" data-toggle="collapse" data-target="#collapse1" aria-expanded="true" aria-controls="collapse1">Descripción</button>
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

					
				</div>
			</div>
		</div>
		<!-- Comprar end -->


		<!-- Productos destacados -->
			<prod-destacados-component></prod-destacados-component >
		<!-- Productos destacados-->

		<!-- Modal para agregar al carrito -->
      	<div class="modal" id="confirmacion">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title pull-left"><strong>Barna</strong></h5>
                      <a class="pull-right mr-1 cursor" data-dismiss="modal" ><i class="fa fa-remove"></i></a>
                  </div>
                  <div class="modal-body">
                      <div class="col-lg-12">
                          <p>¿Está seguro que desea <strong>agregar</strong> el siguiente artículo a mi carrito?</p>
                          <p></p>

                          <div class="table-responsive">
	                        <table class="table table-bordered">
	                          <thead>
	                            <tr>
	                              <th class="text-center">Cant.</th>
	                              <th>Artículo</th>
	                              <th class="text-center">Color</th>
	                              <th class="text-center">Talle</th>
	                              <th class="text-center">Precio</th>
	                            </tr>
	                          </thead>
	                          <tbody>
	                            <tr>
	                              <td class="text-center">{{cantidad_articulo}}</td>
	                              <td>
	                                {{articulo.nombre}} 
	                              </td>
	                              <td class="text-center">
	                              	{{color_seleccionado.valor}} 
	                              	<span class="color-indicador" :style="{ 'background-color':color_seleccionado.color,'color':color_seleccionado.color}">xxx</span></td>
	                              <td class="text-center">{{talle_seleccionada.valor}}</td>
	                              <td class="text-center">{{formatearmoneda(precio_articulo)}}</td>
	                            </tr>
	                          </tbody>
	                        </table>
	                      </div>
                          
                      </div>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-xs btn-inverse pull-right" data-dismiss="modal">No</button>
                      <button type="button" class="btn btn-xs btn-primary pull-right" @click="anadircarrito()">Sí</button>
                  </div>
              </div>
          </div>
      	</div>
      	<!-- Modal para agregar al carrito -->

      	 <loading v-if="isLoading"></loading>
	</div>
</template>

<script>
	import migajasComponent from "../../../components/layouts/migajasComponent.vue";
	import prodDestacadosComponent from "../../../components/pages/share/prodDestacadosComponent.vue"
	import { mapGetters } from 'vuex'
	import CerService from "../../../plugins/CerService";
	import Swatches from 'vue-swatches';
	import "vue-swatches/dist/vue-swatches.min.css";
	import loading from "../../layouts/loading.vue";

	export default {
        components:
        {
        	migajasComponent,
			prodDestacadosComponent,
			Swatches,
			loading
		},
		created()
		{
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
		computed:
		{

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
					tallescolores:[],//agregado por Rafael
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

				//Agregados recientemente
				color_seleccionado:'',
				talle_seleccionada:'',
				cantidad_articulo:1,
				precio_articulo:0,

				talles:[],
            }
        },
        methods:
        {
        	cambiaTalle(talle)
        	{
        		this.talle_seleccionada = talle;
        		this.actualizarPrecio();
        		$('.btn-circular-barna-talle').removeClass('border-barna-talle');
        		$("#"+talle.id).addClass("border-barna-talle");    
        	},
        	cambiaColor(color)
        	{
        		//Asigno al color seleccionado el color al cual hizo click
        		this.color_seleccionado = color;

        		//Vacío la talle seleccionada porque está cambiado el color
        		this.talle_seleccionada = [];
        		$('.btn-circular-barna-talle').removeClass('border-barna-talle');

        		//Actualizo el  precio
        		this.actualizarPrecio();
        		//Actualizo el Borde del color seleccionado
        		$('.btn-circular-barna-color').removeClass('border-barna-color');
        		$("#"+color.id).addClass("border-barna-color");    
        		this.buscarTalles();//Busco las talles según el color
        		this.buscarImagenes();//Busco las imágenes según el color
        	},
        	buscarImagenes()
        	{
        		var encontrado = false;
        		var i = 0;
        		while(!encontrado && i < this.articulo.imagenes_colores.length)
        		{
        			if(this.articulo.imagenes_colores[i].caracteristica_id == this.color_seleccionado.id)
        			{
        				this.imagenActual = this.articulo.imagenes_colores[i].url;
        				encontrado = true;
        			}
        			i++;
        		}
        	},
        	buscarTalles()
        	{
        		this.talles = [];
        		for (var i =  0; i < this.articulo.tallescolores.length; i++)
        		{
        			if( this.articulo.tallescolores[i].color_id==this.color_seleccionado.id)
        			{
        				for (var j = 0; j < this.articulo.talles.length; j++)
        				{
        					if(this.articulo.talles[j].id==this.articulo.tallescolores[i].talle_id)
        					{
        						this.talles.push(this.articulo.talles[j]);
        					}
        				}
        			}
        		}
        	},
        	actualizarPrecio()
        	{
        		var encontrado = false;
        		var i = 0;
        		while(!encontrado && i < this.articulo.tallescolores.length)
        		{
        			if(this.articulo.tallescolores[i].color_id == this.color_seleccionado.id && this.articulo.tallescolores[i].talle_id == this.talle_seleccionada.id)
        			{
        				this.precio_articulo = this.articulo.tallescolores[i].precio;
        				encontrado = true;
        			}
        			i++;
        		}
        		if(!encontrado)
        		{
        			this.precio_articulo = 0;
        		}
        	},
        	cambioImagenPrincipal(imagen)
        	{
        		//¿Que pasa si las imágenes no tiene relación imagen-color?

        		//Vacío la talle seleccionada porque está cambiado el color
        		this.talle_seleccionada = [];
        		$('.btn-circular-barna-talle').removeClass('border-barna-talle');

        		//Actualizo la imagen principal 
        		this.imagenActual = imagen.url;

        		//Asigno al color seleccionado el color al cual hizo click
        		this.color_seleccionado=imagen.color;

        		//Actualizo el border del color seleccionado
        		$('.btn-circular-barna-color').removeClass('border-barna-color');
        		$("#"+imagen.color.id).addClass("border-barna-color");

        		//Busco las talles para el color determinado
        		this.buscarTalles();
        		//Cambio el precio 
        		this.actualizarPrecio();
        	},
			procesar_pago()
			{
				CerService.post("/pagar")
				.then(response => {
				this.url_pago=response.pagar
					window.open(this.url_pago , "_blank");
				})
				.catch(error => {
					this.mensaje("error","Ha ocurrido un error inesperado");
				});
			},
			info_actual()
			{
				this.tallesActuales=[]
				this.preciosActuales=[]
				this.auxTalles=false

				//Buscar relacion Imagen-color
				this.imagenColor.forEach(function(file,i)
				{
					if(file.color.color==this.colorActual)
					{
						this.imagenActual=file.file.url
					}
				},this);

				//buscar relacion talle-color
				this.tallesColores.forEach(function(index,i)
				{
					console.log('Comparando: ', index.colorDeVariante.color, 'con', this.colorActual)
					if(index.colorDeVariante.color==this.colorActual)
					{
						this.preciosActuales.push(index.precioDeVariante)
						this.precioActual=this.articulo.precioGeneral
						//this.tallesActuales[i]=index.TalleDeVariante.valor
						this.tallesActuales.push(index.TalleDeVariante)
						this.auxTalles=true
					}
				},this);

				if(this.auxTalles===false)
				{
					//console.log('ajaa', this.tallesGenerales)
					this.tallesActuales=this.tallesGenerales
				}

				console.log('se esta guardando:', this.tallesActuales)
			},
			info_articulo(id)
			{
				CerService.post("/articulo/"+id+"/seleccionado")
				.then(response =>
				{
					if(response.res == 1)
					{
						//console.log(response.articulo)
						//Esto no está añadiendo las imágenes a los artículos  (Resuelto en las líneas de abajo)
						response.articulo.imagenesarticulos.forEach(function(file,i)
						{
							let aux = {
									id: file.id,
									thumb: file.url,
									url: file.url,
								}
							this.imagenesarticulos.push({...aux})
						},this);

						this.articulo.nombre = response.articulo.nombre
						this.articulo.marca = response.articulo.marca
						this.articulo.descripcion = response.articulo.descripcion
						this.selectedRubro = response.articulo.rubros
						this.articulo.publicado = response.articulo.publicado
						this.articulo.destacado = response.articulo.destacado

						//Añadiendo lo necesario
						this.articulo.tallescolores = response.articulo.tallescolores
						this.articulo.talles = response.articulo.talles
						this.articulo.colores = response.articulo.colores
						this.articulo.imagenes_colores = response.articulo.imagenes_colores
						this.articulo.imagenesarticulos = response.articulo.imagenesarticulos

						if(response.articulo.tipo == 'ropa')
						{
							this.selectedTipo = 'Ropa'
						}
						else
						{
							this.selectedTipo = 'Otros'
						}
						this.articulo.precioGeneral = response.articulo.precio_general
						this.maskAmount = response.articulo.mask_precio
						this.maskCantidad = response.articulo.mask_cantidad
						this.articulo.otros = response.articulo.otros
						this.tallesGenerales = response.articulo.talles
						//this.coloresGenerales = response.articulo.colores

						response.articulo.colores.forEach(function(file,i)
						{
							//this.coloresGenerales[i]=file.color
							this.coloresGenerales.push(file.color)

						},this);

						/* setTimeout(e =>{
						this.colorActual=coloresGenerales[0]
						},500) */

						console.log('COLORES:', this.coloresGenerales);

						this.articulo.cantidad = parseInt(response.articulo.cantidad)
						if(response.articulo.tipo_cantidad == 'por_variante')
						{
							this.cantidadUsada = 'Por Variante'
						}
						else 
						{
							this.cantidadUsada = 'General'
						}

						//talles-colores
						response.articulo.tallescolores.forEach(function(file,i)
						{
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
						response.articulo.imagenes_colores.forEach(function(file,i)
						{
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
							if(file.principal)
							{

								idS = i
								this.imagenActual=file.url
								this.colorActual=file.color.color
								console.log('si es principal:',this.imagenActual)
							}
						},this);

						/* if(response.articulo.imagenes_colores.length){
							setTimeout(e => {
							$("#radio_"+idS).prop("checked", true);
							},10)
						}
						this.isLoading = false */
					}
					else
					{
						this.mensaje('error',response.msg)
						this.$router.push({ name: 'no.encontrado' });
					}
				})
				.catch(error => {
					console.log('Ha ocurrido un error inesperado')
				});

			},
			confirmarcarrito()
			{
				console.log("Confirmando carrito");
				this.isLoading = true;
				if(this.getIsAuth)
				{
					
					if(this.cantidad_articulo>=1 )
					{
						if(this.color_seleccionado!='')
						{
							if(this.talle_seleccionada!='')
							{
								this.isLoading = false;
								$('#confirmacion').modal('show');
							}
							else
							{
								this.isLoading = false;
								this.mensaje('warning',"Disculpe, debe seleccionar una talle");
							}
						}
						else
						{
							this.isLoading = false;
							this.mensaje('warning',"Disculpe, debe seleccionar un color");
						}
					}
					else
					{
						this.isLoading = false;
						this.mensaje('warning',"Disculpe, la cantidad debe ser mayor o igual a 1");
					}
				}
				else
				{
					this.isLoading = false;
					this.mensaje('warning',"Debe estar autentificado para agregar al carrito");
				}
			},
			anadircarrito()
			{
				console.log("Entrando a añadiendo carrito");
				$('#confirmacion').modal('hide');
				this.isLoading = true;
				var dataform = new FormData();
              	dataform.append("articulo_id", this.articuloId);
              	dataform.append("talle_id", this.talle_seleccionada.id);
              	dataform.append("color_id", this.color_seleccionado.id);
              	dataform.append("precio", this.precio_articulo);
              	dataform.append("cantidad", this.cantidad_articulo);
				CerService.post("/carrito/anadir",dataform)
		        .then(response => {
		          	if(response.res==1)
		          	{
		          		console.log("Exito");
		          		
		          		this.isLoading = false;
		          		//Limpiando variables 
		          		this.cantidad_articulo = 1;
		          		this.color_seleccionado = '';
		          		this.talle_seleccionada = '';
		          		//Actualizando los bordes de talle y color
		          		$('.btn-circular-barna-color').removeClass('border-barna-color');
		          		$('.btn-circular-barna-talle').removeClass('border-barna-talle');
		          		//Haciendo el dispacth para actualizar lo que hay en el carrito
		          		this.$store.dispatch('actionAddCart');
		          		this.mensaje("success",response.msg);
		          	}
		          	else
		          	{
		          		this.isLoading = false;
		          		this.mensaje("warning",response.msg);
		          	}
		        })
		        .catch(error => {
		        	this.isLoading = false;
		          	this.mensaje("error","Ha ocurrido un error inesperado");
		        });
			},
			formatearmoneda(monto)
            {
                return monto.toFixed(2);
            },
			mensaje(tipo,mensaje)
			{
				this.$swal
				.mixin({
				toast: true,
				position: "top-end",
				showConfirmButton: false,
				timer: 4000
				})
				.fire({
				type: tipo,
				title: mensaje
				});
			}
		},
		wacth:
		{
		}
    }
</script>