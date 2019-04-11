@extends('front.layouts.main')
@section('title','Rubros')
@section('content')
	<div id="rubros">
		<rubros-component url="{{url('/')}}"></rubros-component>
	</div>
@endsection

@section('extrajs')
	<script src="{{asset('js/rubros.js')}}"></script>
@endsection