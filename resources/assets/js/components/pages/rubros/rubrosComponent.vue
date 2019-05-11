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
                tipos_rubros:
                [
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
            }
        },
        watch:
        {
            getRubro: function(){
              this.rubro=this.$store.getters.getRubro
              //aqui llamamos a los pertinentes servicios que se llaman cuando cambia isDesign
            },
            getSearch: function(){
              this.titulo = this.$store.getters.getSearch
            }

        }
    }
</script>