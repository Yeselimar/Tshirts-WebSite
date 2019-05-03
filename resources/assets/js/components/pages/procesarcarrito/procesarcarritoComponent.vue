<style>
	.checkout-form h4
	{
		color: #3b3b3b !important;
		font-family: 'Josefin Sans', sans-serif;
	}
	.control-label
	{
		color: #3b3b3b !important;
		margin-bottom: 0.2rem;
		/*padding-left: 15px*/;
	}
</style>
<template>
	<div>
		<migajas-component titulo="Tu Carrito > Procesar Carrito"></migajas-component>
		
		<!-- checkout section  -->
		<section class="checkout-section spad">
			<div class="container">
				<div class="row">
					<div class="col-lg-8 order-2 order-lg-1">
						<formulario-component></formulario-component>
					</div>

					<div class="col-lg-4 order-1 order-lg-2">
						<detallescarrito-component></detallescarrito-component>
					</div>
				</div>
			</div>
		</section>
		<!-- checkout section end -->
	</div>
</template>

<script>
	import migajasComponent from "../../../components/layouts/migajasComponent.vue";
	import formularioComponent from "../../../components/pages/procesarcarrito/formularioComponent.vue";
	import detallescarritoComponent from "../../../components/pages/share/detallescarritoComponent.vue";

    export default {
        name:'procesarcarritoComponent',
        components:
        {
        	migajasComponent,
        	formularioComponent,
        	detallescarritoComponent
		},
        props:
        {
        },
        mounted()
        {

        }
        
    }
</script>