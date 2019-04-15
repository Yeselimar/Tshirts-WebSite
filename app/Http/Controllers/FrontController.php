<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
}
