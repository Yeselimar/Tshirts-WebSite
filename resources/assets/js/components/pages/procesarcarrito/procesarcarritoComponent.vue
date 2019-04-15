<style lang="scss" scope>
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
		<!-- header-->
	        <header-component :isdesignp="isDesign" :url="url" :rubrop="rubro" :numcartp="numCart" :numbagp="numBag" :isauthp="isAuth" :searchp="search" @loginM="loginM" @designM="designM"  @searchM="searchM"></header-component>
	    <!--end header -->

		<migajas-component titulo="Tu Carrito > Procesar Carrito"></migajas-component>
		
		<!-- checkout section  -->
		<section class="checkout-section spad">
			<div class="container">
				<div class="row">
					<div class="col-lg-8 order-2 order-lg-1">
						<formulario-component></formulario-component>
					</div>

					<div class="col-lg-4 order-1 order-lg-2">
						<detallescarrito-component :url="url"></detallescarrito-component>
					</div>
				</div>
			</div>
		</section>
		<!-- checkout section end -->
	</div>
</template>

<script>
	import headerComponent from "../../../components/layouts/headerComponent.vue";
	import migajasComponent from "../../../components/layouts/migajasComponent.vue";
	import formularioComponent from "../../../components/pages/procesarcarrito/formularioComponent.vue";
	import detallescarritoComponent from "../../../components/pages/share/detallescarritoComponent.vue";

    export default {
        name:'procesarcarritoComponent',
        components:
        {
        	headerComponent,
        	migajasComponent,
        	formularioComponent,
        	detallescarritoComponent
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
                rubro: ''
			}
		},
        mounted()
        {

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
                
            }
		},
    }
</script>