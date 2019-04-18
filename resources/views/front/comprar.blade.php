@extends('front.layouts.main')
@section('title','Comprar')
@section('content')
	<div id="comprar">
		<comprar-component url="{{url('/')}}"><comprar-component>
	</div>
@endsection

@section('extrajs')
	<script src="{{asset('js/comprar.js')}}"></script>
@endsection