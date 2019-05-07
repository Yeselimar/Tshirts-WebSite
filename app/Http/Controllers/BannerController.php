<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Banner;

class BannerController extends Controller
{
    public function index()
    {
    	$banners = Banner::with("articulo")->get();
    	return response()->json(['banners' => $banners]); 
    }

    public function store(Request $request)
    {
    	$banner = new Banner;
    	$banner->descripcion = $request->descripcion;
    	$banner->articulo_id = $request->articulo_id;

    	$nombre = null;

        if($request->imagen)
        {
            $archivo= $request->imagen;
            $nombre = str_random(50).'.'.$archivo->getClientOriginalExtension();
            $ruta = public_path().'/'.Banner::carpeta();
            $archivo->move($ruta, $nombre);
        }
        
        $banner->imagen = Banner::carpeta().$nombre;
        $banner->save();

        return response()->json(['msg'=>'El banner fue creado exitosamente','banner' => $banner]);
    }
}
