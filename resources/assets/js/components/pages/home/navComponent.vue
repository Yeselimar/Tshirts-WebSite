<template>
 <!-- Hero section -->
          <section v-if="items.length" class="hero-section">
                <div class="hero-slider owl-carousel">
                    <div v-for="(item, i) in items" :key="i"  class="hs-item" :style="'background-image:'+'url(' +url+item.url + ')'">
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-6 col-lg-7 text-white">
                                    <h2>{{item.titulo}}</h2>
                                    <p>{{item.descripcion}}</p>
                                    <a @click.stop.prevent="verDetalle(item.id)" class="site-btn sb-line cursor">DETALLE</a>
                                </div>
                            </div>
                            <div class="align-items-center d-flex justify-content-center offer-card text-white">
                                <h4 class="pb-3 pr-1">$</h4>
                                <h3 class="pb-3">{{item.precio}}</h3>
                            </div>
                        </div>
                    </div>
                    <!--
                    <div class="hs-item set-bg" :data-setbg="url+'/img/bg-2.jpg'">
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-6 col-lg-7 text-white">
                                    <span>New Arrivals</span>
                                    <h2>denim jackets</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. </p>
                                    <a href="#" class="site-btn sb-line">DISCOVER</a>
                                    <a href="#" class="site-btn sb-white">ADD TO CART</a>
                                </div>
                            </div>
                            <div class="offer-card text-white">
                                <span>from</span>
                                <h2>$29</h2>
                                <p>SHOP NOW</p>
                            </div>
                        </div>
                    </div>
                    -->
                </div>
                <div class="container">
                    <div class="slide-num-holder" id="snh-1"></div>
                </div>
            </section>
            <!-- Hero section end -->
</template>

<script>
    import 'owl.carousel'

    export default {
        name:'navComponent',
        props: {
            url: {
                type: String,
                required: true
            },
			isdesignp: {
				type: Boolean,
				required: false,
				value: false,
			}
        },
        data() {
            return {
                barner: [
                    {
                        id: 0,
                        url: '/img/bg.jpg',
                        titulo: 'Denim jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 1229.2
                    },
                    {
                        id: 1,
                        url: '/img/bg-2.jpg',
                        titulo: 'Content Static',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 89.5
                    },
                ],
                barnerDesign: [
                     {
                        id: 2,
                        url: '/img/bg-3.jpg',
                        titulo: 'Toommy jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 19.2
                    },
                    {
                        id: 3,
                        url: '/img/bg-4.jpg',
                        titulo: 'Tonts Static',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 9.5
                    },
                ],
               items: [],
               isDesign: this.isdesignp

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
                 setTimeout(e => { 
					
                    if(this.isDesign){
                            this.items = this.barnerDesign
                        } else {
                            this.items = this.barner
                        }
                setTimeout(e => { 
                                    
                	$(".hero-slider").owlCarousel({
                        loop: true,
                        margin: 0,
                        nav: true,
                        items: 1,
                        dots: true,
                        animateOut: 'fadeOut',
                        animateIn: 'fadeIn',
                        navText: ['<i class="flaticon-left-arrow-1"></i>', '<i class="flaticon-right-arrow-1"></i>'],
                        smartSpeed: 1200,
                        autoHeight: false,
                        autoplay: true,
                        onInitialized: function() {
                            var a = this.items().length;
                            $("#snh-1").html("<span>1</span><span>" + a + "</span>");
                        }
                    }).on("changed.owl.carousel", function(a) {
                        var b = --a.item.index, a = a.item.count;
                        $("#snh-1").html("<span> "+ (1 > b ? b + a : b > a ? b - a : b) + "</span><span>" + a + "</span>");

                    });

                    $(".hero-slider").append('<div class="slider-nav-warp"><div class="slider-nav"></div></div>');
                    $(".hero-slider .owl-nav, .hero-slider .owl-dots").appendTo('.slider-nav');

                },10)	
               },10)	

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
