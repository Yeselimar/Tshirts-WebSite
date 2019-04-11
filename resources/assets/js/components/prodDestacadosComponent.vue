<template>

        <!-- letest product section -->
            <section v-if="items.length " class="top-letest-product-section mb-5 mt-5 bg-gray">
                <div class="container">
                    <div class="section-title">
                        <h2>Productos Destacados</h2>
                    </div>
                    <div  class="product-slider owl-carousel">
                        <div  v-for="(item, i) in items" :key="i"  class="product-item">
                            <div class="pi-pic">
                                <img :src="url+item.url" alt="">
                                <div class="pi-links">
                                    <a  v-if="item.isDesign" class="add-card"><i class="fa fa-shopping-bag"></i><span>Agregar a la Cesta</span></a>
                                    <a  v-else class="add-card"><i class="fa fa-shopping-cart"></i><span>Agregar al carrito</span></a>

                                </div>
                            </div>
                            <div class="pi-text">
                                <h6>${{item.precio}}</h6>
                                <p>{{item.titulo}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- letest product section end -->
</template>

<script>
import 'owl.carousel'
    export default {
        name:'prodDestacadosComponent',
        props: {
            url: {
                type: String,
                required: true
            },
			isdesignp: {
				type: Boolean,
				required: false,
				value: false,
			},
        },
        data() {
            return {
                productDesigns: [
                    {
                        id: 0,
                        url: '/img/product/1.jpg',
                        titulo: 'Blusa jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 29.2,
                        isDesign: true
                    },
                    {
                        id: 1,
                        url: '/img/product/2.jpg',
                        titulo: 'Pantalon jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 12.2,
                        isDesign: true
                    },
                    {
                        id: 2,
                        url: '/img/product/3.jpg',
                        titulo: 'Franella jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 129.2,
                        isDesign: true
                    },
                    {
                        id: 3,
                        url: '/img/product/4.jpg',
                        titulo: 'Carniut jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 99.2,
                        isDesign: true
                    },
                    {
                        id: 4,
                        url: '/img/product/5.jpg',
                        titulo: 'Tienza jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 19.2,
                        isDesign: true
                    },
                ],
                products: [
                    {
                        id: 0,
                        url: '/img/product/6.jpg',
                        titulo: 'Changes jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 2.2,
                        isDesign: false
                    },
                    {
                        id: 1,
                        url: '/img/product/7.jpg',
                        titulo: 'Pages jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 2.2,
                        isDesign: false
                    },
                    {
                        id: 2,
                        url: '/img/product/8.jpg',
                        titulo: 'Nenella jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 19.2,
                        isDesign: false
                    },
                    {
                        id: 3,
                        url: '/img/product/9.jpg',
                        titulo: 'Vitorius jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 9.2,
                        isDesign: false
                    },
                    {
                        id: 4,
                        url: '/img/product/10.jpg',
                        titulo: 'Lorem jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 129.2,
                        isDesign: false
                    },
                ],
                items: [],
                isDesign: false,

            }
        },
        mounted() {
            this.llenarItems()
        },
        methods:{
            verDetalle(i){
                console.log(i)
            },
            llenarItems(){
                this.items = []
                console.log(this.items)
                setTimeout(e => { 
					
                if(this.isDesign){
                    this.items = this.productDesigns
                } else {
                    this.items = this.products
                }
                setTimeout(e => { 
                $('.product-slider').owlCarousel({
                        loop: true,
                        nav: true,
                        dots: false,
                        margin : 30,
                        autoplay: true,
                        navText: ['<i class="flaticon-left-arrow-1"></i>', '<i class="flaticon-right-arrow-1"></i>'],
                        responsive : {
                            0 : {
                                items: 1,
                            },
                            480 : {
                                items: 2,
                            },
                            768 : {
                                items: 3,
                            },
                            1200 : {
                                items: 4,
                            }
                        }
                    });
                },100)	
               },100)	

            }
        },
        watch: {
    		isdesignp: function() {
                this.isDesign = this.isdesignp
                this.llenarItems()
			},
		 }
    }
</script>