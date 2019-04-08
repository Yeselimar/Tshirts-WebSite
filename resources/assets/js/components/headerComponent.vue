<template>
	<!-- Header section -->
	<div class="header-section header-barna-fixed">
		<div class="header-top-barna">
			<div class="container">
				<div class="d-flex align-items-center">
					<div class="flex-basis-logo ">
						<!-- logo -->
						<a href="#" class="site-logo">
							<img :src="url+'/img/barna.jpg'" width="75" height="105" alt="">
						</a>
					</div>
					<div class="flex-basis-design">
						<ul class="d-flex sprd-header-barna">
							<li class="mr-4 sprd-li-barna">
								<a class="js-header-main-cyo" href="#" >
									<div class="title">
										Diseñar

									</div>
									<div class="description">
										Hecho por ti
									</div>
								</a>
							</li>
							<li class="mr-4 sprd-li-barna">
									<a class="js-header-main-cyo" href="#" >
										<div class="title">
											Comprar
							
										</div>
										<div class="description">
											Hecho para ti
										</div>
									</a>
								</li>
						</ul>
					</div>
					<div class="mr-4 flex-basis-search">
						<form class="header-search-form input-group ml-2 mr-2 form-search-barna">
							<div class="input-group-prepend cursor">
								<span class="input-group-text input-group-search-barna" id="basic-addon1"><i class="fa fa-filter" aria-hidden="true"></i></span>
							</div>
							<input type="text" class="input-search-barna form-control" placeholder="Buscar en Barna ....">
							<div class="input-group-append cursor">
								<span class="input-group-text input-group-search-barna"><i class="fa fa-search" aria-hidden="true"></i></span>
							</div>
							<!--<button><i class="flaticon-search"></i></button>-->
						</form>
					</div>
					<div class="flex-basis-icons">
							<div class="user-panel">
								<div class="up-item pr-3">
									<div class="header-cart cursor">
										<i class="fa fa-shopping-bag"></i> 
										<span>0</span>
									</div>
								</div>
								<div class="up-item pr-3">
									<div class="header-cart cursor">
										<i class="fa fa-shopping-cart"></i>
										<span>0</span> 
									</div>
								</div>
								<div class="up-item pr-3">
									<div class="header-cart cursor">
										<i class="fa fa-user"></i>
									</div>
								</div> 
							</div>
					</div>
				</div>
			</div>
		</div>
		<nav class="main-navbar text-center">
			<div class="container">
				<!-- menu -->
				<ul class="main-menu">
					<li><a href="#">Home</a></li>
					<li><a href="#">Women</a></li>
					<li><a href="#">Men</a></li>
					<li><a href="#">Jewelry
						<span class="new">New</span>
					</a></li>
					<li><a href="#">Shoes</a>
						<ul class="sub-menu">
							<li><a href="#">Sneakers</a></li>
							<li><a href="#">Sandals</a></li>
							<li><a href="#">Formal Shoes</a></li>
							<li><a href="#">Boots</a></li>
							<li><a href="#">Flip Flops</a></li>
						</ul>
					</li>
					<li><a href="#">Pages</a>
						<ul class="sub-menu">
							<li><a href="#">Product Page</a></li>
							<li><a href="#">Category Page</a></li>
							<li><a href="#">Cart Page</a></li>
							<li><a href="#">Checkout Page</a></li>
							<li><a href="#">Contact Page</a></li>
						</ul>
					</li>
					<li><a href="#">Blog</a></li>
				</ul>
			</div>
		</nav>
	</div>
	<!-- Header section end -->

</template>

<script>
    export default {
        name:'headerComponent',
        props: {
            url: {
                type: String,
                required: true
            }
        },
        mounted() {

        }
    }
</script>
