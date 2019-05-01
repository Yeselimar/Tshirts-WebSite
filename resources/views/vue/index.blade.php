<!doctype html>
<html lang="es">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta name="keywords" content="Barna, Remeras, Diseño, Personalización, Compra, Venta">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<meta name="author" content="AFODI">
		<meta name="csrf-token" content="{{ csrf_token() }}">

		<title>Barna</title>
		<link href="{{asset('img/barna.jpg')}}" type="image/x-icon" rel="shortcut icon" />


        <!-- Style-->
        <link href="{{asset('css/front/bootstrap/dist/css/bootstrap.min.css')}}" rel="stylesheet"/>
        <link href="{{asset('css/front/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet"/>
        <link href="{{asset('css/front/flaticon.css')}}" rel="stylesheet"/>
        <link href="{{asset('css/front/slicknav/dist/slicknav.min.css')}}" rel="stylesheet"/>
        <link href="{{asset('css/front/jquery-ui-css/jquery-ui.min.css')}}" rel="stylesheet"/>
        <link href="{{asset('css/front/owl.carousel/dist/assets/owl.carousel.min.css')}}" rel="stylesheet"/>
        <link href="{{asset('css/front/animate.css/animate.css')}}" rel="stylesheet"/>        
        <link href="{{asset('css/front/style.css')}}" rel="stylesheet"/>
       
    </head>
    <body class="scroll-barna-body sl-solid">
        <!--loading-->
        <div id="preloder">
            <div class="loader"></div>
        </div>
        <div id="preloader">
            <div class="loading"></div>
        </div>
        <!--end loading-->
        <div id="app">
            <router-view url="{{asset('/')}}"></router-view>
        </div>
        <script src="{{ asset('js/app.js')}}"></script>

    </body>
</html>
