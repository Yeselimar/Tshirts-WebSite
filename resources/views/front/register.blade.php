@extends('front.layouts.main')
@section('title','Registro')
@section('content')
        <div id="registerC">
            <register-component url="{{url('/')}}"></register-component>
        </div>
  
@endsection
@section('extrajs')
<script src="{{asset('js/register.js')}}"></script>
@endsection