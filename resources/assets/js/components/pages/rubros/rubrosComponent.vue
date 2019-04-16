<style lang="scss" scope>
    #texto-rosa-barna
    {
        color: #ef7a6e;
    }
    #lista-activa a:after
    {
        position: absolute;
        content: "";
        width: 9px;
        height: 9px;
        left: 0;
        top: 13px;
        border: 1px solid #ef7a6e;
        border-radius: 50%;
        background: #ef7a6e;
    }
</style>
<template>
	<div>
		<!-- header-->
            <header-component :isdesignp="isDesign" :isRouteRubro="true" :url="url" :rubrop="rubro" :numcartp="numCart" :numbagp="numBag" :isauthp="isAuth" :searchp="search" @loginM="loginM" @designM="designM"  @searchM="searchM" @searchK="searchK"></header-component>
        <!--end header -->
        
		<!-- Rubros section -->
		<section class="category-section spad">
			<div class="container">
				<div class="row">
					<div class="col-lg-3 order-2 order-lg-1">
						<div class="filter-widget">
							<h2 class="fw-title">Rubros </h2>
							<ul class="category-menu">
                                <template v-for="rubro in tipos_rubros">
                                    <template v-if="rubro.seleccionable">
                                        <li id="lista-activa">
                                            <a id="texto-rosa-barna" @click.prevent="cambialo(rubro)"><strong>{{rubro.nombre}}</strong></a>
                                        </li>
                                    </template>
                                    <template v-else>
                                        <li>
                                            <a @click.prevent="cambialo(rubro)">{{rubro.nombre}}</a>
                                        </li>
                                    </template>
                                </template>
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
                titulo: '',
                tipos_rubros:
                [
                    {
                        "id": 1,
                        "nombre": 'Todas las categorías',
                        "seleccionable": true,
                    },
                    {
                        "id": 1,
                        "nombre": 'Hombre',
                        "seleccionable": false,
                    },
                    {
                        "id": 2,
                        "nombre": 'Mujer',
                        "seleccionable": false,
                    },
                    {
                        "id": 3,
                        "nombre": 'Niño',
                        "seleccionable": false,
                    },
                    {
                        "id": 4,
                        "nombre": 'Niña',
                        "seleccionable": false,
                    },
                    {
                        "id": 5,
                        "nombre": 'Taza',
                        "seleccionable": false,
                    },
                    {
                        "id": 6,
                        "nombre": 'Buzo',
                        "seleccionable": false,
                    }
                ]
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
            },
            searchK(e)
            {
            	this.titulo=e.search;
                this.rubro=e.rubro;
            },
            cambialo(rubro)
            {
                if(rubro.nombre.toLowerCase()=="Todas las categorías".toLowerCase())
                {
                    this.rubro = '';//reasigno para actualizar el componente header
                }
                else
                {
                    this.rubro = rubro.nombre;//reasigno para actualizar el componente header
                }
                /*esto es codigo repetido*/
                for (var i in this.tipos_rubros)
                {
                    this.tipos_rubros[i].seleccionable = false;
                }
                if(this.rubro.toLowerCase()==''.toLowerCase())
                {
                    this.tipos_rubros[0].seleccionable = true;
                }
                else
                {
                    for (var i in this.tipos_rubros)
                    {
                        if (this.tipos_rubros[i].nombre.toLowerCase() == this.rubro.toLowerCase())
                        {
                            this.tipos_rubros[i].seleccionable = true;
                            break; 
                        }
                    }
                }
                /*esto es codigo repetido*/
            }
		},
        watch:
        {
            rubro: function()
            {
                /*esto es codigo repetido*/
                for (var i in this.tipos_rubros)
                {
                    this.tipos_rubros[i].seleccionable = false;
                }
                if(this.rubro.toLowerCase()==''.toLowerCase())
                {
                    this.tipos_rubros[0].seleccionable = true;
                }
                else
                {
                    for (var i in this.tipos_rubros)
                    {
                        if (this.tipos_rubros[i].nombre.toLowerCase() == this.rubro.toLowerCase())
                        {
                            this.tipos_rubros[i].seleccionable = true;
                            break; 
                        }
                    }
                }
                /*esto es codigo repetido*/
            },

        }
    }
</script>