@extends('front.layouts.main')
@section('title','Rubros')
@section('content')
	<!-- Rubros section -->
	<section class="category-section spad">
		<div class="container">
			<div class="row">
				<div class="col-lg-3 order-2 order-lg-1">
					<div class="filter-widget">
						<h2 class="fw-title">Rubros</h2>
						<ul class="category-menu">
							<li><a href="#">Hombre</a></li>
							<li><a href="#">Mujer</a></li>
							<li><a href="#">Niño</a></li>
							<li><a href="#">Niña</a></li>
							<li><a href="#">Tazas</a></li>
							<li><a href="#">Buzo</a></li>
						</ul>
					</div>
				</div>

				<div class="col-lg-9  order-1 order-lg-2 mb-5 mb-lg-0">
					<div id="misarticulos">
						<misarticulos-component ></misarticulos-component>
					</div>			
				</div>

			</div>
		</div>
	</section>
	<!-- Rubros section end -->
@endsection

@section('extrajs')
	<script src="{{asset('js/misarticulos.js')}}"></script>
@endsection