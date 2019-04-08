<template>
    <div>


<!-- Footer section -->
	<section class="footer-section">
		<div class="container">
			<div class="row">
				<div class="col-lg-4 col-sm-4">
					<div class="footer-widget about-widget">
						<h2>Métodos de Pago:</h2>
						<img :src="url+'/img/cards.png'" alt="">
					</div>
				</div>
				<div class="col-lg-4 col-sm-4">
					<div class="footer-widget about-widget">
						<h2>Atención al cliente:</h2>
						<ul>
							<li><a href=""><i class="fa fa-envelope"></i> ventas@barna.com.ar</a></li>
							<li><a href=""><i class="fa fa-phone"></i> +54 677-11122233</a></li>
						</ul>
						
					</div>
				</div>
				<div class="col-lg-4 col-sm-4">
					<div class="footer-widget about-widget">
						<h2>Empresa:</h2>
						<ul>
							<li><a href="">Acerca de Barna</a></li>
							<li><a href="">Términos y Condiciones</a></li>
							<li><a href="">Políticas de Envío y Devolución</a></li>
						</ul>
					</div>
				</div>
				
			</div>
		</div>
		<div class="social-links-warp">
			<div class="container">
				<div class="social-links text-center">
					<a href="" class="instagram"><i class="fa fa-instagram"></i><span>instagram</span></a>
					<a href="" class="facebook"><i class="fa fa-facebook"></i><span>facebook</span></a>
					<a href="" class="twitter"><i class="fa fa-twitter"></i><span>twitter</span></a>
				</div>

	            <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> 
	            <p class="text-white text-center mt-2">Copyright &copy;<span>{{new Date().getFullYear()}}</span> All rights reserved | This template is made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a></p>
	            <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->

	            <div>
	            	<p class="text-center text-white mt-1" style="margin: 0px 0px;">Desarrollado por: <a href="#"><img :src="url+'/img/afodi-logo.png'" style="height: 20px;width: auto;"></a></p>
	            </div>
			</div>
		</div>
	</section>
	<!-- Footer section end -->


    </div>
</template>

<script>
    export default {
        name:'footerComponent',
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
