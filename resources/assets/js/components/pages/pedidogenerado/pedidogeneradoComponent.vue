<style>
	.col-center
	{
		float: none;
  		margin-left: auto;
  		margin-right: auto;
	}
	.table td, .table th
	{
		border-top: 3px solid #E1E1E1;
		padding-right: 0px;
	    padding-top: 0.80rem;
	    padding-bottom: 0.80rem;
	    padding-left: 0px;
	}
	#sin-linea th
	{
		border-top: 3px solid #fff;
	}
	#con-linea td
	{
		border-bottom: 3px solid #E1E1E1;
	}
	.badge-pill
	{
		text-align: center;
	    padding-right: 1.4em;
	    padding-left: 1.6em;
	    border-radius: 10rem;
	}
	.aviso
	{
		padding-bottom: 20px;
		padding-top: 20px
	}
	.btn-mp
	{
		font-size: 13px !important;
	    padding: 9px 15px 9px !important;
	}
</style>
<template>
	<div>
		
        <migajas-component titulo="¡Tu pedido ha sido enviado!"></migajas-component>

        <div class="aviso">
        	<p class="h5 text-center">Gracias por confiar en Barna, le notificaremos cuando su pedido haya sido aprobado.</p>
        </div>
       

        <br>

        <!-- pedido generado -->
		<div class="col-md-5 col-xs-12 col-center">
			<div class="table-responsive">
				<table class="table table-hover">
					<thead>
						<tr id="sin-linea">
							<th>Producto</th>
							<th class="text-center">Cant. </th>
							<th class="text-center">Precio Unit.</th>
							<th class="text-center">Precio Total</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="articulo in recibo.articulos">
							<td>{{articulo.articulo.nombre}}</td>
							<td class="text-center">x {{articulo.cantidad}}</td>
							<td class="text-center">$ {{formatearmoneda(articulo.precio)}}</td>
							<td class="text-center">$ {{formatearmoneda(articulo.precio*articulo.cantidad)}}</td>
						</tr>
						<tr>
							<td class="text-right" colspan="3"><strong>Total Productos</strong></td>
							<td class="text-center">
								<strong>{{totalproductos(recibo.articulos)}}</strong>
							</td>
						</tr>
						<tr>
							<td class="text-right" colspan="3"><strong>Total</strong></td>
							<td class="text-center">
								<strong>$ {{formatearmoneda(total(recibo.articulos))}}</strong>
							</td>
						</tr>
						<tr id="con-linea">
							<td class="text-right" colspan="3"><strong>Estatus</strong></td>
							<td class="text-center">
								<span v-if="recibo.estatus=='enviado'" class="badge badge-pill badge-primary">Enviado</span>
								<span v-else-if="recibo.estatus=='aprobado'" class="badge badge-pill badge-info">Aprobado</span>
								<span v-else-if="recibo.estatus=='rechazado'" class="badge badge-pill badge-danger">Aprobado</span>
								<span v-else-if="recibo.estatus=='rechazado'" class="badge badge-pill badge-success">Aprobado</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="text-right">
				<!-- Cuando es un recibo aprobado o recibo tipo de factura -->
				<button class="site-btn btn-mp" v-if="recibo.estatus=='aprobado' || recibo.tipo=='factura'">
					<i class="fa fa-handshake-o" aria-hidden="true"></i>
					Pagar con Mercado Pago
				</button>
			</div>
		</div>

		<p></p>
		
		<!-- end pedido generado -->

		<br>	
		<br>	
		<br>	
		<br>	
	</div>
</template>

<script>
	import migajasComponent from "../../../components/layouts/migajasComponent.vue";

	export default
    {
    	data() {
			return {
				tipo:'',
				recibo:
				{
					"id":5,
					"tipo": "factura",
					"estatus": "aprobado",
					"usuario":
                    {
                    	"id":1,
                    	"name":"Rafael",
                    	"last_name": "Delgado",
                    },
                    "articulos":
                    [
						{
		                    "id": 1,
		                    "cantidad": 5,
		                    "precio": 150.05,
		                    "disponible": true,
		                    "tipo": "compra",
		                    "articulo":
		                    {
		                    	"id":1,
		                    	"nombre":"Remera de Cabellero corte V",
		                    	"precio_general": 158.078,
		                    },
		                },
		                {
		                    "id": 2,
		                    "cantidad": 3,
		                    "precio": 140.20,
		                    "disponible": true,
		                    "articulo":
		                    {
		                    	"id":1,
		                    	"nombre":"Remera Adidas corta",
		                    	"precio_general": 180.5,
		                    },
		                }
	                ]
				},
                isLoading: false,
                isDesign: false,
                numCart: 0,
                numBag: 0,
                isAuth: false,
                search: '',
                rubro: '',
                titulo: ''
			}
		},
        name:'pedidogeneradoComponent',
        components:
        {
		    migajasComponent
		},
        props:
        {
        	url:
            {
	            type: String,
	            require:true
        	}
        },
		created: function()
		{
			this.obtenerarticulos();

		},
        methods:
        {
        	formateocifra(number, length)
        	{
			    var my_string = '' + number;
			    while (my_string.length < length) {
			        my_string = '0' + my_string;
			    }
			    return my_string;
			},
        	formatearmoneda(monto)
            {
                return monto.toFixed(2);
            },
            totalproductos(articulos)
            {
            	var i;
        		var cantidad = 0;
				for (i = 0; i < articulos.length; i++)
				{ 
				  	cantidad = cantidad + articulos[i].cantidad;
				}
				return this.formateocifra(cantidad,2);
            },
            total(articulos)
        	{
        		var i;
        		var total = 0;
				for (i = 0; i < articulos.length; i++)
				{ 
				  	total = total + (articulos[i].cantidad*articulos[i].precio);
				}
				return total;
        	},
        	obtenerarticulos()
        	{

        	},
            loginM(e)
            {
                
            },
            designM(e)
            {
                
            },
            searchM(e)
            {
            	this.titulo=e.search;
                this.rubro=e.rubro;
                console.log(e.rubro);
            },
            searchK(e)
            {
            	this.titulo=e.search;
                this.rubro=e.rubro;
                console.log(e.rubro);
            }
		}
    }
</script>