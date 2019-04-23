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

		<title>Barna-Admin</title>
		<link href="{{asset('img/barna.jpg')}}" type="image/x-icon" rel="shortcut icon" />

        <link href="{{asset('css/back/css/lib/chartist/chartist.min.css')}}" rel="stylesheet"/>
        <link href="{{asset('css/back/css/lib/owl.carousel.min.css')}}" rel="stylesheet"/>
        <link href="{{asset('css/back/css/lib/owl.theme.default.min.css')}}" rel="stylesheet"/>
        <!-- Bootstrap Core CSS -->
        <link href="{{asset('css/back/css/lib/bootstrap/bootstrap.min.css')}}" rel="stylesheet"/>
        <!-- Custom CSS -->
        <link href="{{asset('css/back/css/helper.css')}}" rel="stylesheet"/>
        <link href="{{asset('css/back/css/style.css')}}" rel="stylesheet"/>

        <!-- Fonts -->

        <!-- Style-->
       
    </head>

    <body class="fix-header fix-sidebar">
        <!-- Preloader - style you can find in spinners.css -->
        
        <!--loading-->
        <div class="preloader">
            <svg class="circular" viewBox="25 25 50 50">
                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" /> </svg>
        </div>
        <!--end loading-->

        <div id="back">
            <router-view></router-view>
        </div>

        <script src="{{ mix('js/back.js')}}"></script>

    </body>
</html>
