@extends('front.layouts.main')
@section('title','Diseñar Producto')
@section('extracss')

@endsection
@section('content')
    <div id="disenarProducto">
        <disenar-component  url="{{url('/')}}"><disenar-component>
    </div>
@endsection

@section('extrajs')
    <script src="{{asset('js/disenar.js')}}"></script>
@endsection