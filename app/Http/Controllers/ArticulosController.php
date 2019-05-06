<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Articulo;
use App\ImageArticulo;
use App\TalleColor;


class ArticulosController extends Controller
{
    public function index()
    {
    	$articulos = Articulo::with('imagenesarticulos')->with('rubros')->get();
        foreach ($articulos as $key => $articulo)
        {
            $encontrado = false;
            $longitud = $articulo->imagenesarticulos->count();
            if($longitud>0)
            {
                $i = 0;
                $imagenes = $articulo->imagenesarticulos;
                while(!$encontrado && $i<$longitud)
                {
                    if($imagenes[$i]->principal==1)
                    {
                        $imagen = $imagenes[$i];
                        $encontrado = true;
                    }
                    $i++;
                }
                if($encontrado)
                {
                    $articulo['principal'] = $imagen;
                }
                //¿Qué pasa si no encuentro la imagen principal?
            }
        }
    	return response()->json(['articulos' => $articulos]); 
    }

    public function imagenprincipal($id)
    {
        
        $imagen = null;
        $articulo = Articulo::find($id);
        return response()->json(['imagen' => $imagen]); 
    }

    public function storenodisenable(Request $request)
    {
        $articulo = new Articulo;
        dd($request);
        return response()->json(['msg' => 'prueba','res'=> 1,'request' => $request]); 
    }

    public function storedisenable()
    {

    }

    public function update()
    {

    }

    public function show()
    {
    	
    }

    public function destroy()
    {

    }

}
