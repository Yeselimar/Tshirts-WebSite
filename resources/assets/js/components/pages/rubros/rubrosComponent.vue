<style>
    .texto-rosa-barna
    {
        color: #ef7a6e !important;
    }
    .lista-activa a:after
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
        
        <migajas-component titulo="Rubros"></migajas-component>

        <!-- Rubros section -->
        <section class="category-section spad">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 order-2 order-lg-1">
                        <div class="filter-widget">
                            <h2 class="fw-title">Rubros </h2>
                            <ul class="category-menu">
                                <li :class="[{'lista-activa': (getRubro === '')}]"><a @click.prevent="cambialo('')" :class="[{'texto-rosa-barna': (getRubro === '')}]" class="cursor" ><strong>Todas las categorías</strong></a></li>
                                <li v-for="(rubro,i) in tipos_rubros" :key="i" :class="[{'lista-activa': (getRubro === rubro.nombre)}]">
                                    <a @click.prevent="cambialo(rubro)" :class="[{'texto-rosa-barna': getRubro === rubro.nombre}]" class="cursor"><strong>{{rubro.nombre}}</strong></a>
                                </li>
                               <!-- <template >
                                    <template v-if="rubro.nombre == getRubro">
                                        <li class="lista-activa">
                                            <a class="texto-rosa-barna" @click.prevent="cambialo(rubro)"><strong>{{rubro.nombre}}</strong></a>
                                        </li>
                                    </template>
                                    <template v-else>
                                        <li>
                                            <a @click.prevent="cambialo(rubro)">{{rubro.nombre}}</a>
                                        </li>
                                    </template>
                                </template>
                                -->
                            </ul>
                        </div>
                    </div>

                    <div class="col-lg-9  order-1 order-lg-2 mb-5 mb-lg-0">
                        <div id="misarticulos">
                            <misarticulos-component></misarticulos-component>
                        </div>          
                    </div>

                </div>
            </div>
        </section>
        <!-- Rubros section end -->
    </div>
</template>

<script>
    import migajasComponent from "../../../components/layouts/migajasComponent.vue";
    import misarticulosComponent from "../../../components/pages/share/misarticulosComponent.vue";
    import { mapGetters } from 'vuex'
    import CerService from "../../../plugins/CerService";

    export default {
        name:'rubrosComponent',
        components:
        {
            migajasComponent,
            misarticulosComponent
        },
        data() {
            return {
                isLoading: false,
                isAuth: false,
                search: '',
                rubro: '',
                titulo: '',
                isDesign: '',
                tipos_rubros:
                [
                    /*
                    {
                        "id": 1,
                        "nombre": 'Hombre',
                    },
                    {
                        "id": 2,
                        "nombre": 'Mujer',
                    },
                    {
                        "id": 3,
                        "nombre": 'Niño',
                    },
                    {
                        "id": 4,
                        "nombre": 'Niña',
                    },
                    {
                        "id": 5,
                        "nombre": 'Taza',
                    },
                    {
                        "id": 6,
                        "nombre": 'Buzo',
                    }
                    */
                ]
            }
        },
        mounted()
        {
             let element = document.getElementById("header-top");
              var options = {
                offset: 0,
                force: true
              };
              this.$scrollTo(element, 0, options);
        },
        created()
        {
            this.isDesign = this.getIsDesign
            this.titulo = this.getSearch
            this.rubro = this.getRubro
            this.obtenerrubros();

        },
        computed: 
        {
            ...mapGetters(['getIsDesign', 'getRubro', 'getSearch','getUser','getIsAuth']),
        },
        methods:
        {
            obtenerrubros()
            {
                CerService.post("/rubros/todos/api")
                .then(response => 
                {
                  this.tipos_rubros=response.rubros;
                })
                .catch(error => {
                  this.mensaje("error","Ha ocurrido un error inesperado");
                });
            },
            cambialo(rubro)
            {
                if(rubro === '')
                {
                    this.rubro = '';//reasigno para actualizar el componente header
                    this.$store.dispatch('cambiarRubro',this.rubro)

                }
                else
                {
                    this.rubro = rubro.nombre;//reasigno para actualizar el componente header
                    this.$store.dispatch('cambiarRubro',this.rubro)

                }
                /*esto es codigo repetido
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
            getRubro: function(){
              this.rubro=this.$store.getters.getRubro
              //aqui llamamos a los pertinentes servicios que se llaman cuando cambia isDesign
            },
            getIsDesign: function(){
              this.isDesign = this.$store.getters.getIsDesign
            },
            getSearch: function(){
              this.titulo = this.$store.getters.getSearch
            }
            /*rubro: function()
            {
                ///esto es codigo repetido
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
                ///esto es codigo repetido
            },*/

        }
    }
</script>