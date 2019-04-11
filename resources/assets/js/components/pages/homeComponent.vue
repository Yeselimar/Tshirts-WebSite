
<template>
	<!-- home section -->
	<div>
        <!-- header-->
            <header-component :isdesignp="isDesign" :url="url" :rubrop="rubro" :numcartp="numCart" :numbagp="numBag" :isauthp="isAuth" :searchp="search" @loginM="loginM" @designM="designM"  @searchM="searchM"></header-component>
        <!--end header -->
        <!--nav -->
            <nav-component :url="url"></nav-component>
        <!-- end nav -->
        <!-- items -->
            <items-component :url="url"></items-component>
        <!-- end items -->
            <prod-destacados-component :isdesignp="isDesign" :url="url"></prod-destacados-component >


            <!-- Product filter section -->
            <section class="product-filter-section">
                <div class="container">
                    <div class="section-title">
                        <h2>BROWSE TOP SELLING PRODUCTS</h2>
                    </div>
                    <ul class="product-filter-menu">
                        <li><a href="#">TOPS</a></li>
                        <li><a href="#">JUMPSUITS</a></li>
                        <li><a href="#">LINGERIE</a></li>
                        <li><a href="#">JEANS</a></li>
                        <li><a href="#">DRESSES</a></li>
                        <li><a href="#">COATS</a></li>
                        <li><a href="#">JUMPERS</a></li>
                        <li><a href="#">LEGGINGS</a></li>
                    </ul>
                    <div class="row">
                        <div class="col-lg-3 col-sm-6">
                            <div class="product-item">
                                <div class="pi-pic">
                                    <img :src="url+'/img/product/5.jpg'" alt="">
                                    <div class="pi-links">
                                        <a href="#" class="add-card"><i class="flaticon-bag"></i><span>ADD TO CART</span></a>
                                        <a href="#" class="wishlist-btn"><i class="flaticon-heart"></i></a>
                                    </div>
                                </div>
                                <div class="pi-text">
                                    <h6>$35,00</h6>
                                    <p>Flamboyant Pink Top </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6">
                            <div class="product-item">
                                <div class="pi-pic">
                                    <div class="tag-sale">ON SALE</div>
                                    <img :src="url+'/img/product/6.jpg'" alt="">
                                    <div class="pi-links">
                                        <a href="#" class="add-card"><i class="flaticon-bag"></i><span>ADD TO CART</span></a>
                                        <a href="#" class="wishlist-btn"><i class="flaticon-heart"></i></a>
                                    </div>
                                </div>
                                <div class="pi-text">
                                    <h6>$35,00</h6>
                                    <p>Black and White Stripes Dress</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6">
                            <div class="product-item">
                                <div class="pi-pic">
                                    <img :src="url+'/img/product/7.jpg'" alt="">
                                    <div class="pi-links">
                                        <a href="#" class="add-card"><i class="flaticon-bag"></i><span>ADD TO CART</span></a>
                                        <a href="#" class="wishlist-btn"><i class="flaticon-heart"></i></a>
                                    </div>
                                </div>
                                <div class="pi-text">
                                    <h6>$35,00</h6>
                                    <p>Flamboyant Pink Top </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6">
                            <div class="product-item">
                                <div class="pi-pic">
                                    <img :src="url+'/img/product/8.jpg'" alt="">
                                    <div class="pi-links">
                                        <a href="#" class="add-card"><i class="flaticon-bag"></i><span>ADD TO CART</span></a>
                                        <a href="#" class="wishlist-btn"><i class="flaticon-heart"></i></a>
                                    </div>
                                </div>
                                <div class="pi-text">
                                    <h6>$35,00</h6>
                                    <p>Flamboyant Pink Top </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6">
                            <div class="product-item">
                                <div class="pi-pic">
                                    <img :src="url+'/img/product/9.jpg'" alt="">
                                    <div class="pi-links">
                                        <a href="#" class="add-card"><i class="flaticon-bag"></i><span>ADD TO CART</span></a>
                                        <a href="#" class="wishlist-btn"><i class="flaticon-heart"></i></a>
                                    </div>
                                </div>
                                <div class="pi-text">
                                    <h6>$35,00</h6>
                                    <p>Flamboyant Pink Top </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6">
                            <div class="product-item">
                                <div class="pi-pic">
                                    <img :src="url+'/img/product/10.jpg'" alt="">
                                    <div class="pi-links">
                                        <a href="#" class="add-card"><i class="flaticon-bag"></i><span>ADD TO CART</span></a>
                                        <a href="#" class="wishlist-btn"><i class="flaticon-heart"></i></a>
                                    </div>
                                </div>
                                <div class="pi-text">
                                    <h6>$35,00</h6>
                                    <p>Black and White Stripes Dress</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6">
                            <div class="product-item">
                                <div class="pi-pic">
                                    <img :src="url+'/img/product/11.jpg'" alt="">
                                    <div class="pi-links">
                                        <a href="#" class="add-card"><i class="flaticon-bag"></i><span>ADD TO CART</span></a>
                                        <a href="#" class="wishlist-btn"><i class="flaticon-heart"></i></a>
                                    </div>
                                </div>
                                <div class="pi-text">
                                    <h6>$35,00</h6>
                                    <p>Flamboyant Pink Top </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6">
                            <div class="product-item">
                                <div class="pi-pic">
                                    <img :src="url+'/img/product/12.jpg'" alt="">
                                    <div class="pi-links">
                                        <a href="#" class="add-card"><i class="flaticon-bag"></i><span>ADD TO CART</span></a>
                                        <a href="#" class="wishlist-btn"><i class="flaticon-heart"></i></a>
                                    </div>
                                </div>
                                <div class="pi-text">
                                    <h6>$35,00</h6>
                                    <p>Flamboyant Pink Top </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-center pt-5">
                        <button class="site-btn sb-line sb-dark">LOAD MORE</button>
                    </div>
                </div>
            </section>
            <!-- Product filter section end -->


          
    		<loading v-if="isLoading"></loading>

    </div>

</template>

<script>
import loading from "../../components/layouts/loading.vue";
import headerComponent from "../../components/headerComponent.vue";
import navComponent from "../../components/navComponent.vue"
import itemsComponent from "../../components/itemsComponent.vue"
import prodDestacadosComponent from "../../components/prodDestacadosComponent.vue"

 
export default {
        name:'homeComponent',
        props: {
            url: {
                type: String,
                required: true
			}
		},
		components: {
            headerComponent,
            navComponent,
            loading,
            itemsComponent,
            prodDestacadosComponent
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
		methods: {
            loginM(e){
                this.isLoading = true
                window.name = e.name
                window.last_name = e.last_name
                window.isAuth = true
                this.isAuth = true;
                setTimeout(e => { 
                    console.log('inicio de sesion exitoso')
                    this.isLoading = false
                },500)	
            },
            designM(e){
                if (e !== this.isDesign){
                    this.isDesign = e
                    window.isDesign = e
					this.isLoading = true
					setTimeout(e => { 
                        this.isLoading = false
					},500)	
				} 
            },
            searchM(e){
                this.search = e.search
                this.rubro = e.rubro
                window.search = e.search
                window.rubro = e.rubro
                this.isLoading = true
                setTimeout(e => { 
                    this.isLoading = false
                },500)	
            }
		},
        created() {
            this.isLoading = true
            if (typeof window.isDesign === 'undefined') {
                this.isDesign = false
            }
            if (typeof window.isAuth === 'undefined') {
                this.isAuth = false
            }
            if (typeof window.numBag  === 'undefined') {
               this.numBag = 0
            }
            if (typeof window.numCart  === 'undefined') {
                this.numCart = 0
            }
            if (typeof window.search  === 'undefined') {
                this.search = ''
            }
            if (typeof window.rubro  === 'undefined') {
                this.rubro = ''
            }
		},
		beforeMount() {
			this.isLoading = false	
		},
    }
</script>
