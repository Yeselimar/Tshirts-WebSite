<template>

        <!-- letest product section -->
            <section v-if="items.length " class="top-letest-product-section bg-gray">
                <div class="container">
                    <div class="section-title">
                        <h2>Productos Destacados</h2>
                    </div>
                    <div  class="product-slider owl-carousel">
                        <div  v-for="(item, i) in items" :key="i"  class="product-item border-items">
                            <div class="pi-pic">
                                <div class="box-barna">
                                    <img v-if="item.principal" :src="getUrl+item.principal.url" alt="">
                                </div>
                                <div class="pi-links" v-if="getIsDesign" >
                                    <a  @click.prevent.stop="disenar(item.id)"  class="add-card add-bag cursor"><i class="fa fa-magic"></i><span>Diseñar</span></a>
                                </div>
                                <div class="pi-links" v-else  >
                                    <a @click.stop.prevent="verDetalle(item.id)" class="add-card cursor"><i class="fa fa-eye"></i><span>Ver Detalle</span></a>

                                </div>

                            </div>
                            <div class="pi-text">
                                <h6>${{item.precio_general}}</h6>
                                <p>{{item.nombre}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- letest product section end -->
</template>

<script>
import { mapGetters } from 'vuex'
import loading from "../../../components/layouts/loading.vue";
import CerService from "../../../plugins/CerService";

    export default {
        name:'prodDestacadosComponent',
        components: {
            loading,
        },
        data() {
            return {
                productDesigns: [
                ],
                products: [
                   
                ],
                items: [],
            }
        },
        computed: {

            ...mapGetters(['getIsDesign', 'getRubro', 'getSearch','getUser','getIsAuth','getUrl']),
        },
        mounted() {
            this.llenarItems()

        },
        methods:{
             articulosDestacadosDisenables()
            {
                this.isLoading = true
                CerService.post("/articulos/destacados/todos/personalizables")
                .then(response => 
                {
                    this.items = response.articulos;
                    this.carousel();
                    this.isLoading = false;
                })
                .catch(error => {
                    this.articulos = [];
                    this.isLoading = false;
                    console.log('Ha ocurrido un error inesperado');
                });
            },
            articulosDestacadosnoDisenables()
            {
                this.isLoading =true

                CerService.post("/articulos/destacados/todos/no-personalizables")
                .then(response => 
                {
                    this.items = response.articulos;
                    this.carousel();
                    this.isLoading = false;
                })
                .catch(error => {
                    this.items = [];
                    this.isLoading = false;
                    console.log('Ha ocurrido un error inesperado');
                });
            },
            disenar (idProd){
                let element = document.getElementById("header-top");
                var options = {
                offset: 0,
                force: true
                };
                this.$scrollTo(element, 0, options);
                this.$router.push({ name: 'disenar', params: { id: idProd } })

            },
            carousel (){
                setTimeout(e => {
             
                    $('.product-slider').owlCarousel({
                            loop: false,
                            rewind: true,
                            nav: true,
                            dots: false,
                            margin : 30,
                            autoplay: true,
                            navText: ['<i class="flaticon-left-arrow-1"></i>', '<i class="flaticon-right-arrow-1"></i>'],
                            responsive : {
                                0 : {
                                   items: (this.items.length >= 1) ? 1: this.items.length,

                                },
                                480 : {
                                   items: (this.items.length >= 2) ? 2: 1,
                                },
                                768 : {
                                   items: (this.items.length >= 3) ? 3: 2,
                                },
                                1200 : {
                                   items: (this.items.length >= 4) ? 4: 3,
                                }
                            }
                        });
                },10)
            },
            verDetalle (idProd){
                if(this.$route.name === 'detalleComprar'){
                    let element = document.getElementById("header-top");
                    var options = {
                        offset: 0,
                        force: true
                    };
                    this.$scrollTo(element, 0, options);
                }

                this.$router.push({ name: 'detalleComprar', params: { id: idProd } })

            },
            llenarItems(){
                this.items = []
                if(this.getIsDesign){
                    this.articulosDestacadosDisenables()
                } else {
                    this.articulosDestacadosnoDisenables()
                }
                
            }
        },
        watch: {
    		getIsDesign: function() {
                this.llenarItems()
			},
		 }
    }
</script>