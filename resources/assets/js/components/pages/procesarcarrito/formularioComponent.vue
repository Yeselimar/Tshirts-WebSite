<template>
	<div>
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
					<label class="control-label"><strong>Teléfono</strong></label>
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
					<label class="control-label"><strong>Dirección completa</strong></label>
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
					<label class="control-label"><strong>Nro de tarjeta </strong></label>
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
</template>

<script>
	export default
    {
        name:'formularioComponent',
        mounted()
        {

        }
    }
</script>