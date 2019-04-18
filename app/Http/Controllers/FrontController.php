<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Articulo;
use App\Grupo;
use App\ImagenArticulo;
use App\Coordenada;
use App\Caracteristica;
use App\Rubro;
use App\TallaColor;
use App\User;
use App\Recibo;
use App\Notificacion;
use App\DetalleRecibo;
use App\Diseno;
use App\ImagenDiseno;

class FrontController extends Controller
{
    //
    public function index()
    {
        /*
        $noticias = Noticia::query()->where('tipo', '=', "noticia")->where('al_carrousel','=','1')->orderBy('updated_at','desc')->limit(5)->get();
        $organizaciones=  Banner::where('tipo','=','organizaciones')->get();
        $instituciones=  Banner::where('tipo','=','instituciones')->get();
        $empresas=  Banner::where('tipo', '=', "empresas")->get();
        $banners = Banner::where('tipo', '=', "banner")->get();
        return view('index')->with('route',"home")->with(compact('noticias','cantidad','organizaciones','instituciones','empresas','banners'));
        */
 
        return view('front.index');
    }

    public function rubros()
    {
        return view('front.rubros');
    }

    public function procesarcarrito()
    {
        return view('front.procesarcarrito');
    }

    public function pedidogenerado()
    {
        return view('front.pedidogenerado');
    }
    
    public function disenarproducto()
    {
        return view('front.disenar');
    }

    public function comprarproducto()
    {
        return view('front.comprar');
    }

    public function register()
    {
        if(Auth::check()){
            return redirect()->route('inicio');
        }
        return view('front.register');
    }

    public function prueba()
    {
        $articulo = Articulo::find(1);
        //return $articulo->caracteristicas;
        //return $articulo->imagenesarticulos;
        //return $articulo->rubros;
        //return $articulo->tallacolor;

        $grupo = Grupo::find(1);
        //return $grupo->caracteristicas;

        $caracteristica = Caracteristica::find(1);
        //return $caracteristica->grupo;

        $imagenarticulo = ImagenArticulo::find(1);
        //return $imagenarticulo->coordenada;
        //return $imagenarticulo->articulo;

        $coordenada = Coordenada::find(1);
        //return $coordenada;

        $rubros = Rubro::find(1);
        //return $rubros->articulos;

        $tallacolor = TallaColor::find(1);
        //return $tallacolor;
        //return $tallacolor->articulo;
        //return $tallacolor->color;
        //return $tallacolor->talla;

        $user = User::find(1);
        //return $user->recibos;
        //return $user->notificaciones;

        $recibo = Recibo::find(1);
        //return $recibo->usuario;
        //return $recibo->detalles;
        //return $recibo->impuestosdescuentos;

        $notificacion = Notificacion::find(1);
        //return $notificacion->usuario;

        $detallesrecibo = DetalleRecibo::find(1);
        //return $detallesrecibo->articulo;
        //return $detallesrecibo->diseno;
        //return $detallesrecibo->recibo;

        $diseno = Diseno::find(1);
        //return $diseno->imagendiseno;
        //return $diseno->imagenarticulo;
    }
}