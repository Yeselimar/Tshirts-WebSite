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

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700,800,300" rel='stylesheet' type='text/css'>

        <!-- Style-->
       
    </head>
    <body>
        <!--loading-->
        <!--end loading-->
        <div id="back">
            <router-view></router-view>
        </div>
        <script src="{{ mix('js/back.js')}}"></script>

    </body>
</html>
