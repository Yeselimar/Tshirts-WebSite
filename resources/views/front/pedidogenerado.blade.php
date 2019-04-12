@extends('front.layouts.main')
@section('title','Pedido Generado')
@section('extracss')

@endsection
@section('content')
	<div id="pedidogenerado">
		<pedidogenerado-component><pedidogenerado-component>
	</div>
@endsection

@section('extrajs')
	<script src="{{asset('js/pedidogenerado.js')}}"></script>
@endsection