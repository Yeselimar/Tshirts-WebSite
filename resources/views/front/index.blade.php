@extends('front.layouts.main')
@section('title','Inicio')
@section('content')
        <div id="homeC">
            <home-component url="{{url('/')}}"></home-component>
        </div>
  
@endsection
@section('extrajs')
<script src="{{asset('js/home.js')}}"></script>
@endsection