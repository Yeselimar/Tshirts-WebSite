<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="{{asset('css/front/bootstrap/dist/css/bootstrap.min.css')}}" rel="stylesheet"/>
        <link href="{{asset('css/front/font-awesome/css/font-awesome.min.css')}}" rel="stylesheet"/>
        <link href="{{asset('css/front/flaticon.css')}}" rel="stylesheet"/>
        <link href="{{asset('css/front/slicknav/dist/slicknav.min.css')}}" rel="stylesheet"/>
        <link href="{{asset('css/front/jquery-ui-css/jquery-ui.min.css')}}" rel="stylesheet"/>
        <link href="{{asset('css/front/owl.carousel/dist/assets/owl.carousel.min.css')}}" rel="stylesheet"/>
        <link href="{{asset('css/front/animate.css/animate.css')}}" rel="stylesheet"/>        
        <link href="{{asset('css/front/style.css')}}" rel="stylesheet"/>

       
    </head>
    <body>

        <div id=headerC>
            <header-component></header-component>
        </div>
        <div id="designC">
            <design-component :url="'Esto es una prueba'"></design-component>
        </div>

        <script src="{{asset('js/app.js')}}"></script>
        <script src="{{asset('js/header.js')}}"></script>
        <script src="{{asset('js/design.js')}}"></script>

    </body>
</html>
