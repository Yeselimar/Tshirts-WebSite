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
</style>
<template>
	<div>
		
        <migajas-component titulo="¡Tu pedido ha sido envíado!"></migajas-component>

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
							<th class="text-center">Precio</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Remera Adidas corta</td>
							<td class="text-center">x 1</td>
							<td class="text-center">$ 900.20</td>
						</tr>
						<tr>
							<td>Remera de Cabellero corte V</td>
							<td class="text-center">x 1</td>
							<td class="text-center">$ 900.20</td>
						</tr>
						<tr>
							<td>Remera Adidas corta</td>
							<td class="text-center">x 1</td>
							<td class="text-center">$ 900.20</td>
						</tr>
						<tr id="con-linea">
							<td ><strong>Estatus</strong></td>
							<td class="text-center" colspan="2">
								<span class="badge badge-pill badge-primary">Enviado</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
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
        data() {
			return {
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
        methods:
        {
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