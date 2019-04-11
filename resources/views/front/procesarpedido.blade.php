@extends('front.layouts.main')
@section('title','Procesar Pedido')
@section('extracss')
<style>
	.checkout-form h4
	{
		color: #3b3b3b !important;
		font-family: 'Josefin Sans', sans-serif;
	}
	.control-label
	{
		color: #3b3b3b !important;
		margin-bottom: 0.2rem;
		/*padding-left: 15px*/;
	}
</style>
@endsection
@section('content')
	<!-- header-->
        <header-component :isdesignp="isDesign" :url="url" :rubrop="rubro" :numcartp="numCart" :numbagp="numBag" :isauthp="isAuth" :searchp="search" @loginM="loginM" @designM="designM"  @searchM="searchM"></header-component>
    <!--end header -->

	<!-- Page info -->
	<div class="page-top-info">
		<div class="container">
			<h2>Tu Cesta > Procesar Pedido</h2>
		</div>
	</div>
	<!-- Page info end -->

	<!-- checkout section  -->
	<section class="checkout-section spad">
		<div class="container">
			<div class="row">
				<div class="col-lg-12 order-2 order-lg-1">
					<form class="checkout-form">

						<div class="row">
							<div class="col-md-12">
								<h4>Dirección de Envío</h4>
								<br>
							</div>
						</div>

						<div class="row address-inputs">
							<div class="col-md-12">
								<label class="control-label"><strong>Dirección Línea 1</strong></label>
								<input type="text">
							</div>
							<div class="col-md-12">
								<label class="control-label"><strong>Dirección Línea 2</strong></label>
								<input type="text">
							</div>
							
							<div class="col-md-6">
								<label class="control-label"><strong>Ciudad</strong></label>
								<input type="text">
							</div>
							<div class="col-md-6">
								<label class="control-label"><strong>Código Postal</strong></label>
								<input type="text">
							</div>
							<div class="col-md-12">
								<label class="control-label"><strong>Nombre</strong></label>
								<input type="text">
							</div>
						</div>

						<div class="row">
							<div class="col-md-12">
								<h4>Dirección de Facturación</h4>
								<br>
							</div>
						</div>

						<div class="row address-inputs">
							<div class="col-md-12">
								<label class="control-label"><strong>Dirección Línea 1</strong></label>
								<input type="text">
							</div>
							<div class="col-md-12">
								<label class="control-label"><strong>Dirección Línea 2</strong></label>
								<input type="text">
							</div>
							
							<div class="col-md-6">
								<label class="control-label"><strong>Ciudad</strong></label>
								<input type="text">
							</div>
							<div class="col-md-6">
								<label class="control-label"><strong>Código Postal</strong></label>
								<input type="text">
							</div>
							<div class="col-md-12">
								<label class="control-label"><strong>Nombre</strong></label>
								<input type="text">
							</div>
						</div>


						<div class="row">
							<div class="col-md-12">
								<h4>Información de Pago</h4>
								<br>
							</div>
						</div>

						<div class="row address-inputs">
							<div class="col-md-6">
								<label class="control-label"><strong>Titular</strong></label>
								<input type="text">
							</div>
							<div class="col-md-6">
								<label class="control-label"><strong>Tarjeta</strong></label>
								<div class="cf-radio-btns address-rb">
									<div class="cfr-item">
										<input type="radio" name="pm" id="one">
										<label for="one">Visa</label>
									</div>
									<div class="cfr-item">
										<input type="radio" name="pm" id="two">
										<label for="two">Master Card</label>
									</div>
									<div class="cfr-item">
										<input type="radio" name="pm" id="three">
										<label for="three">America Express</label>
									</div>
								</div>
							</div>
							<div class="col-md-6">
								<label class="control-label"><strong>Nro de ....</strong></label>
								<input type="text">
							</div>
							<div class="col-md-6">
								<label class="control-label"><strong>Fecha de Expiración</strong></label>
								<input type="text">
							</div>
							<div class="col-md-3">
								<label class="control-label"><strong>Código de Seguridad</strong></label>
								<input type="text">
							</div>
						</div>

					</form>
				</div>
				
			</div>
		</div>
	</section>
	<!-- checkout section end -->
@endsection

@section('extrajs')
	<script>
		import headerComponent from "../../components/headerComponent.vue";
	</script>
@endsection