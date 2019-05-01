<style lang="scss" scope>

.filter {
	font-family:arial;
	padding: 6px 6px;
	cursor:pointer;
	border-radius: 6px;
	transition: all 0.35s;
}

.filter.active {
	box-shadow:0px 1px 3px 0px #00000026;
    background: lightgray !important;
}

.filter:hover {
	background:lightgray;
} 

.projects {
	display:flex;
    flex-wrap:wrap;
	justify-content: center;
}

.projects-enter {
	transform: scale(0.5) translatey(-80px);
	opacity:0;
}

.projects-leave-to{
	transform: translatey(30px);
	opacity:0;
}

.projects-leave-active {
	position: absolute;
	z-index:-1;
}


.project {
    transition: all .35s ease-in-out;
    padding: 10px;
    margin: 5px;
    flex-basis: 24%;
	box-shadow:0px 2px 8px lightgrey;
	
}
@media (max-width: 980px) {
   .project {
         flex-basis: 31%;
        }
    }
    @media (max-width: 750px) {
       .project {
         flex-basis: 47%;
        }
    }
      @media (max-width: 450px) {
       .project {
         flex-basis: 100%;
        }
    }
</style>

<template>
	<!-- home section -->
	<div>
        <!--nav -->
            <nav-component></nav-component>
        <!-- end nav -->
        <!-- items -->
            <items-component></items-component>
        <!-- end items -->
            <prod-destacados-component></prod-destacados-component >


            <!-- Product filter section -->
            <section class="product-filter-section">
                <div class="container">
                    <div class="section-title">
                        <h2>Productos para <span v-if="getIsDesign">diseñar</span><span v-else>comprar</span></h2>
                    </div>
                    <ul class="product-filter-menu md-d-flex-barna scroll-barna overflow-auto text-center">
                        <li><a class="filter" v-bind:class="{ active: currentFilter === '' }" v-on:click="setFilter('')">TODAS</a></li>
                        <li v-for="(rubro,i) in tipos_rubros" :key="i"><a class="filter" v-bind:class="{ active: currentFilter === rubro.nombre }" v-on:click="setFilter(rubro.nombre)">{{rubro.nombre}}</a></li>

                    </ul>
                    <div class="" style="
                            min-height: 50vh;
                            position: relative;
                        ">
                        <transition-group class="projects" name="projects" >
                            <div class="project" v-bind:key="project.id" v-for="project in projectsC" >
                                <div class="product-item">
                                    <div class="pi-pic">
                                        <img :src="getUrl+project.url" alt="">
                                        <div class="pi-links">
                                            <a  v-if="project.isDesign" @click="addBag(project)" class="add-card add-bag cursor"><i class="fa fa-magic"></i><span>Diseñar</span></a>
                                    <a  v-else class="add-card cursor" @click="addCart(project)"><i class="fa fa-eye"></i><span>Ver Detalle</span></a>
                                        </div>
                                    </div>
                                    <div class="pi-text">
                                        <h6>${{project.precio}}</h6>
                                        <p>{{project.titulo}} </p>
                                    </div>
                                </div>
                            </div>
                        </transition-group>
                        <p class="center-element no-found-search"  v-if="totalI === 0">
                          No hay resultados</p>
                        
                    </div>
                    <div class="text-center pt-5" v-if="isMax">
                        <button @click="verMas" class="site-btn sb-line sb-dark">VER MÁS</button>
                    </div>
                </div>
            </section>
            <!-- Product filter section end -->


          
    		<loading v-if="isLoading"></loading>

            <!--modals-->

            
            <!--end modals -->
    </div>

</template>

<script>
import loading from "../../../components/layouts/loading.vue";
import navComponent from "../../../components/pages/home/navComponent.vue"
import itemsComponent from "../../../components/pages/home/itemsComponent.vue"
import prodDestacadosComponent from "../../../components/pages/share/prodDestacadosComponent.vue"
import { mapGetters } from 'vuex'


 
export default {
        name:'homeComponent',
		components: {
             navComponent,
            loading,
            itemsComponent,
            prodDestacadosComponent
        },
        computed: {
            ...mapGetters(['getIsDesign', 'getRubro', 'getSearch','getUser','getIsAuth','getCart','getBag','getUrl']),
             projectsC: function() {
                let projectAux = []
                if(this.projects  && this.projects.length)
                {
                this.projects.forEach(function(project,index){
                        if((this.currentFilter === project.categoria || this.currentFilter === '') && projectAux.length < this.max){
                            projectAux.push(project)
                        }
                },this);
                }
                this.totalI = projectAux.length
                return projectAux
            },
            isMax: function() {
                let m = true;
                if(this.projects.length < this.max || this.totalI < this.max) {
                    m = false
                }
                return m;
            }
        },
		data() {
			return {
                totalI : 0,
                max : 12,
                currentFilter: '',
                tipos_rubros:
                    [
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
                ],
                projects: [],
                 productDesigns: [
                    {
                        id: 10020,
                        url: 'img/product/12.jpg',
                        titulo: 'Blusa jackets',
                        categoria: 'Hombre',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 29.2,
                        isDesign: true
                    },
                    {
                        id: 1589,
                        categoria: 'Hombre',
                        url: 'img/product/9.jpg',
                        titulo: 'Pantalon jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 12.2,
                        isDesign: true
                    },
                    {
                        id: 54632,
                        url: 'img/product/8.jpg',
                        categoria: 'Mujer',
                        titulo: 'Franella jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 129.2,
                        isDesign: true
                    },
                    {
                        id: 345645,
                        url: 'img/product/7.jpg',
                        titulo: 'Carniut jackets',
                        categoria: 'Mujer',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 99.2,
                        isDesign: true
                    },
                    {
                        id: 14562,
                        categoria: 'Hombre',
                        url: 'img/product/9.jpg',
                        titulo: 'Pantalon jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 12.2,
                        isDesign: true
                    },
                    {
                        id: 2,
                        url: 'img/product/8.jpg',
                        categoria: 'Niño',
                        titulo: 'Franella jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 129.2,
                        isDesign: true
                    },
                    {
                        id: 31245,
                        url: 'img/product/7.jpg',
                        categoria: 'Niña',
                        titulo: 'Carniut jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 99.2,
                        isDesign: true
                    },
                    {
                        id: 400,
                        url: 'img/product/6.jpg',
                        categoria: 'Hombre',
                        titulo: 'Tienza jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 19.2,
                        isDesign: true
                    },
                     {
                        id: 10748,
                        url: 'img/product/1.jpg',
                        titulo: 'Blusa jackets',
                        categoria: 'Niña',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 29.2,
                        isDesign: true
                    },
                    {
                        id: 1999,
                        url: 'img/product/2.jpg',
                        categoria: 'Niña',
                        titulo: 'Pantalon jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 12.2,
                        isDesign: true
                    },
                    {
                        id: 102,
                        url: 'img/product/3.jpg',
                        categoria: 'Taza',
                        titulo: 'Franella jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 129.2,
                        isDesign: true
                    },
                    {
                        id: 513,
                        url: 'img/product/4.jpg',
                        titulo: 'Carniut jackets',
                        categoria: 'Taza',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 99.2,
                        isDesign: true
                    },
                    {
                        id: 45582,
                        url: 'img/product/3.jpg',
                        categoria: 'Taza',
                        titulo: 'Franella jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 129.2,
                        isDesign: true
                    },
                    {
                        id: 321,
                        url: 'img/product/4.jpg',
                        titulo: 'Carniut jackets',
                        categoria: 'Taza',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 99.2,
                        isDesign: true
                    },
                    {
                        id: 21112,
                        url: 'img/product/3.jpg',
                        categoria: 'Taza',
                        titulo: 'Franella jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 129.2,
                        isDesign: true
                    },
                    {
                        id: 22273,
                        url: 'img/product/4.jpg',
                        titulo: 'Carniut jackets',
                        categoria: 'Taza',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 99.2,
                        isDesign: true
                    },
                    {
                        id: 5564,
                        url: 'img/product/11.jpg',
                        titulo: 'Tienza jackets',
                        categoria: 'Buzo',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 19.2,
                        isDesign: true
                    },
                ],
                products: [
                    {
                        id: 4440,
                        url: 'img/product/12.jpg',
                        titulo: 'Blusa jackets',
                        categoria: 'Hombre',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 29.2,
                        isDesign: false
                    },
                    {
                        id: 555411,
                        categoria: 'Hombre',
                        url: 'img/product/9.jpg',
                        titulo: 'Pantalon jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 12.2,
                        isDesign: false
                    },
                    {
                        id: 2665,
                        url: 'img/product/8.jpg',
                        categoria: 'Mujer',
                        titulo: 'Franella jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 129.2,
                        isDesign: false
                    },
                    {
                        id: 105633,
                        url: 'img/product/7.jpg',
                        titulo: 'Carniut jackets',
                        categoria: 'Niño',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 99.2,
                        isDesign: false
                    },
                    {
                        id: 555451,
                        categoria: 'Niño',
                        url: 'img/product/9.jpg',
                        titulo: 'Pantalon jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 12.2,
                        isDesign: false
                    },
                    {
                        id: 5552,
                        url: 'img/product/8.jpg',
                        categoria: 'Niño',
                        titulo: 'Franella jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 129.2,
                        isDesign: false
                    },
                    {
                        id: 5553,
                        url: 'img/product/7.jpg',
                        categoria: 'Niña',
                        titulo: 'Carniut jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 99.2,
                        isDesign: false
                    },
                    {
                        id: 4454,
                        url: 'img/product/6.jpg',
                        categoria: 'Hombre',
                        titulo: 'Tienza jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 19.2,
                        isDesign: false
                    },
                     {
                        id: 5550,
                        url: 'img/product/1.jpg',
                        titulo: 'Blusa jackets',
                        categoria: 'Mujer',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 29.2,
                        isDesign: false
                    },
                    {
                        id: 5661,
                        url: 'img/product/2.jpg',
                        categoria: 'Niña',
                        titulo: 'Pantalon jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 12.2,
                        isDesign: false
                    },
                    {
                        id: 542,
                        url: 'img/product/3.jpg',
                        categoria: 'Taza',
                        titulo: 'Franella jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 129.2,
                        isDesign: false
                    },
                    {
                        id: 45543,
                        url: 'img/product/4.jpg',
                        titulo: 'Carniut jackets',
                        categoria: 'Niña',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 99.2,
                        isDesign: false
                    },
                    {
                        id: 2222,
                        url: 'img/product/3.jpg',
                        categoria: 'Taza',
                        titulo: 'Franella jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 129.2,
                        isDesign: false
                    },
                    {
                        id: 3,
                        url: 'img/product/4.jpg',
                        titulo: 'Carniut jackets',
                        categoria: 'Taza',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 99.2,
                        isDesign: false
                    },
                    {
                        id: 1111,
                        url: 'img/product/3.jpg',
                        categoria: 'Taza',
                        titulo: 'Franella jackets',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 129.2,
                        isDesign: false
                    },
                    {
                        id: 223,
                        url: 'img/product/4.jpg',
                        titulo: 'Carniut jackets',
                        categoria: 'Taza',
                        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
                         +'Quis ipsum sus-pendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
                        precio: 99.2,
                        isDesign: false
                    }
                ],
                url: '',
                isLoading: false,
                showNav: true,
			}
		},
		methods: {
            addCart (product){
                if(this.getIsAuth){
                    this.isLoading = true
                        this.$store.dispatch('actionAddCart',{...product}).then((res)=>{
                          this.isLoading = false
                            if (res === 1) {
                                this.$swal
                                .mixin({
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 4000
                                })
                                .fire({
                                type: "success",
                                title: "El Producto fue agregado a su carrito exitosamente"
                                });
                            } else {
                               this.$swal
                                .mixin({
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 4000
                                })
                                .fire({
                                type: "error",
                                title: "Ha ocurrido un error al añadir al carrito"
                                });
                            }
                        })
                } else {
                        this.$swal
                        .mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 4000
                        })
                        .fire({
                        type: "warning",
                        title: "Debe estar autentificado para agregar al carrito"
                        });
                }
            },
            addBag (product){
                if(this.getIsAuth){
                    this.isLoading = true
                        this.$store.dispatch('actionAddBag',{...product}).then((res)=>{
                            this.isLoading = false
                            if (res === 1) {
                                this.$swal
                                .mixin({
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 4000
                                })
                                .fire({
                                type: "success",
                                title: "El Producto fue agregado a su cesta exitosamente"
                                });
                            } else {
                               this.$swal
                                .mixin({
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 4000
                                })
                                .fire({
                                type: "error",
                                title: "Ha ocurrido un error al añadir a la cesta"
                                });
                            }
                        })
                } else {
                        this.$swal
                        .mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 4000
                        })
                        .fire({
                        type: "warning",
                        title: "Debe estar autentificado para agregar a la cesta"
                        });
                }
            },
            setFilter: function(filter) {
			    this.currentFilter = filter;
            },
            verMas() {
            //this.$store.dispatch('cambiarRubro',String(event.target.innerText))
            this.$store.dispatch('cambiarRubro',this.currentFilter)
            let search = ""
            this.$store.dispatch('cambiarSearch',search)
            this.$router.push({ name: 'rubros' })


            },
        },
        mounted: function(){
             let element = document.getElementById("header-top");
              var options = {
                offset: 0,
                force: true
              };
              this.$scrollTo(element, 0, options);
            $(window).resize(event=>{
                            event.preventDefault()
                            if(document.body.clientWidth<=768 && document.body.clientWidth >= 460)
                                this.max = 6
                            else if(document.body.clientWidth < 460)
                                    this.max = 3
                                else 
                                     this.max = 12
            });
        },
        created() {
            if(this.getIsDesign){
                this.projects = this.productDesigns
            }else {
                this.projects = this.products
            }
            if(document.body.clientWidth<=768 && document.body.clientWidth >= 460)
				this.max = 6
			else if(document.body.clientWidth < 460)
                    this.max = 3
                else 
                    this.max = 12
			
            this.isLoading = true  
		},
		beforeMount() {
			this.isLoading = false	
        },
          watch: {
            getIsDesign: function(){
                if(this.getIsDesign){
                    this.projects = this.productDesigns
                }else {
                    this.projects = this.products
                }
            //console.log('esto esta cambiando a ',this.getIsDesign)
            //aqui llamamos a los pertinentes servicios que se llaman cuando cambia isDesign
            }
    }
}
</script>
