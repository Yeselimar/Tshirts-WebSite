@extends('front.layouts.main')
@section('title','Inicio')
@section('content')
        <div id="homeC">
            <home-component url="{{url('/')}}"></home-component>
        </div>
       {{-- <div id="navC">
            <nav-component url="{{url('/')}}"></nav-component>
        </div>
        <div id="itemsC">
            <items-component url="{{url('/')}}"></items-component>
        </div>
        --}}
  
@endsection
@section('extrajs')
<script src="{{asset('js/home.js')}}"></script>
{{--
<script src="{{asset('js/nav.js')}}"></script>
<script src="{{asset('js/items.js')}}"></script>--}}
@endsection