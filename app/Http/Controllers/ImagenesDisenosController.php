<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ImagenDiseno;
use File;
use Illuminate\Support\Facades\Auth;


class ImagenesDisenosController extends Controller
{
    
    public function index()
    {
    	$imagenes = ImagenDiseno::with('categoria')->with('usuario')->get();
    	return response()->json(['imagenes' => $imagenes]); 
    }

    public function store(Request $request)
    {
        //dd($request);
        $imagen = new ImagenDiseno;
        $imagen->nombre = $request->nombre;
        $imagen->categoria_id = $request->categoria_id;

        $nombre = null;
        $hola = null;
        if($request->imagene)
        {
            $hola = "error backend";
            $archivo= $request->imagene;
            $nombre = str_random(50).'.'.$archivo->getClientOriginalExtension();
            $ruta = public_path().'/'.ImagenDiseno::carpeta();
            $archivo->move($ruta, $nombre);
        }
        
        $imagen->url = ImagenDiseno::carpeta().$nombre;
        $imagen->user_id = Auth::user()->id;
        $imagen->save();

        return response()->json(['msg'=>'El imágen prediseñada fue creada exitosamente','imagen' => $imagen,'hola'=>$request->imagene]);
    }

    public function update($id)
    {

    }

    public function show($id)
    {

    }

    public function destroy()
    {

    }
}
