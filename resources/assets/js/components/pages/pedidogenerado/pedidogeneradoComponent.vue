<style lang="scss" scope>
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
</style>
<template>
	<div>
		<!-- header-->
            <header-component :isdesignp="isDesign" :url="url" :rubrop="rubro" :numcartp="numCart" :numbagp="numBag" :isauthp="isAuth" :searchp="search" @loginM="loginM" @designM="designM"  @searchM="searchM" @searchK="searchK"></header-component>
        <!--end header -->

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
	</div>
</template>

<script>
	import headerComponent from "../../../components/layouts/headerComponent.vue";
	export default
    {
        name:'pedidogeneradoComponent',
        components:
        {
		    headerComponent
		},
        props:
        {

        }
    }
</script>