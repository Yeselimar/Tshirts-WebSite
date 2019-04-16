<template>
	<div>
		<!-- header-->
            <header-component :isdesignp="isDesign" :url="url" :rubrop="rubro" :numcartp="numCart" :numbagp="numBag" :isauthp="isAuth" :searchp="search" @loginM="loginM" @designM="designM"  @searchM="searchM" @searchK="searchK"></header-component>
        <!--end header -->
        
		<!-- Rubros section -->
		<section class="category-section spad">
			<div class="container">
				<div class="row">
					<div class="col-lg-3 order-2 order-lg-1">
						<div class="filter-widget">
							<h2 class="fw-title">Rubros {{rubro}}</h2>
							<ul class="category-menu">
								<li><a href="#">Hombre</a></li>
								<li><a href="#">Mujer</a></li>
								<li><a href="#">Niño</a></li>
								<li><a href="#">Niña</a></li>
								<li><a href="#">Tazas</a></li>
								<li><a href="#">Buzo</a></li>
							</ul>
						</div>
					</div>

					<div class="col-lg-9  order-1 order-lg-2 mb-5 mb-lg-0">
						<div id="misarticulos">
							<misarticulos-component :url="url" :titulop="titulo" :isDesign="isDesign" :rubro="rubro"></misarticulos-component>
						</div>			
					</div>

				</div>
			</div>
		</section>
		<!-- Rubros section end -->
	</div>
</template>

<script>
	import headerComponent from "../../../components/layouts/headerComponent.vue";
	import misarticulosComponent from "../../../components/pages/share/misarticulosComponent.vue";

    export default {
        name:'rubrosComponent',
        components:
        {
        	headerComponent,
		    misarticulosComponent
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
		},
    }
</script>