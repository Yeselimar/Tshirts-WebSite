<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ImagenPredisenada;
use File;
use Illuminate\Support\Facades\Auth;


class ImagenesPredisenadasController extends Controller
{
    
    public function index()
    {
    	$imagenes = ImagenPredisenada::with('categoria')->with('usuario')->with('disenos')->get();
    	return response()->json(['imagenes' => $imagenes]); 
    }

    public function deadministrador()
    {
        $imagenes = ImagenPredisenada::where('tipo','=','administrador')->with('categoria')->with('usuario')->with('disenos')->get();
        return response()->json(['imagenes' => $imagenes]); 
    }

    public function decliente()
    {
        $imagenes = ImagenPredisenada::where('tipo','=','cliente')->with('categoria')->with('usuario')->with('disenos')->get();
        return response()->json(['imagenes' => $imagenes]);
    }

    public function store(Request $request)
    {
        $imagen = new ImagenPredisenada;
        $imagen->nombre = $request->nombre;
        $imagen->categoria_id = ($request->categoria_id=='') ? null : $request->categoria_id ;
        $imagen->tipo = "administrador";

        $nombre = null;
        if($request->imagen)
        {
            $archivo= $request->imagen;
            $nombre = str_random(50).'.'.$archivo->getClientOriginalExtension();
            $ruta = public_path().'/'.ImagenPredisenada::carpeta();
            $archivo->move($ruta, $nombre);
        }
        
        $imagen->url = ImagenPredisenada::carpeta().$nombre;
        $imagen->user_id = Auth::user()->id;
        $imagen->save();

        return response()->json(['msg'=>'El imagen prediseñada fue creada exitosamente','imagen' => $imagen]);
    }

    public function update(Request $request,$id)
    {
        $imagen = ImagenPredisenada::find($id);
        $imagen->nombre = $request->nombre;
        $imagen->categoria_id = ($request->categoria_id=='') ? null : $request->categoria_id ;

        $nombre = null;
        if($request->imagen)
        {
            File::delete($imagen->url);

            $archivo= $request->imagen;
            $nombre = str_random(50).'.'.$archivo->getClientOriginalExtension();
            $ruta = public_path().'/'.ImagenPredisenada::carpeta();
            $archivo->move($ruta, $nombre);

            $imagen->url = ImagenPredisenada::carpeta().$nombre;
        }
        
        $imagen->user_id = Auth::user()->id;
        $imagen->save();

        return response()->json(['msg'=>'El imagen prediseñada fue creada exitosamente','imagen' => $imagen]);
    }

    public function show($id)
    {
        $imagen = ImagenPredisenada::find($id);
        return response()->json(['imagen' => $imagen]);
    }

    public function destroy($id)
    {
        $imagen = ImagenPredisenada::find($id);
        if($imagen->disenos->count()==0)//Si no hay un diseño que referencia a la imagen prediseñada la puedo eliminar
        {
            File::delete($imagen->url);
            $imagen->delete();
            return response()->json(['res'=>1,'msg'=>'La imagen prediseñada fue eliminada exitosamente']);
        }
        else
        {
            return response()->json(['res'=>2,'msg'=>'La imagen prediseñada no puede ser eliminada']);
        }
    }
}
