@extends('front.layouts.main')
@section('title','Procesar Carrito')
@section('content')
	
	<div id="procesarCarrito">
		<procesarcarrito-component url="{{url('/')}}"></procesarcarrito-component>
	</div>

@endsection
@section('extrajs')
	<script src="{{asset('js/procesarcarrito.js')}}"></script>
@endsection