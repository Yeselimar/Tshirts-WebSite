<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

    public function register()
    {
        if(Auth::check()){
            return redirect()->route('inicio');
        }
        return view('front.register');
    }

    public function prueba()
    {
        $client = new \GuzzleHttp\Client();
          $request = new \GuzzleHttp\Psr7\Request('GET', 'https://api.mercadopago.com/v1/advanced_payments/1');
            $promise = $client->sendAsync($request)->then(function ($response) {
                //echo $response->getStatusCode(); # 200
                //echo $response->getHeaderLine('content-type'); # 'application/json; charset=utf8'
               
                try {
                     echo $response->getStatusCode();
                     echo $response->getBody(); # '{"id": 1420053, "name": "guzzle", ...}'    
                }
                catch (GuzzleHttp\Exception\ClientException $e) {
                    echo $e->getResponse();
                    echo $response->getBody()->getContents();
                }
            } catch (GuzzleHttp\Exception\ClientException $e) {
                    echo $e->getResponse();
                    echo $response->getBody()->getContents();
                });


            $promise->wait();
        //return response()->json(['' => $grupo->caracteristicas]); 
    }
}
