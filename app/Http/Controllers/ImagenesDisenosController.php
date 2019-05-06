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
    	$imagenes = ImagenDiseno::with('categoria')->with('usuario')->with('disenos')->get();
    	return response()->json(['imagenes' => $imagenes]); 
    }

    public function store(Request $request)
    {
        //dd($request);
        $imagen = new ImagenDiseno;
        $imagen->nombre = $request->nombre;
        $imagen->categoria_id = ($request->categoria_id=='') ? null : $request->categoria_id ;

        $nombre = null;
        if($request->imagen)
        {
            $archivo= $request->imagen;
            $nombre = str_random(50).'.'.$archivo->getClientOriginalExtension();
            $ruta = public_path().'/'.ImagenDiseno::carpeta();
            $archivo->move($ruta, $nombre);
        }
        
        $imagen->url = ImagenDiseno::carpeta().$nombre;
        $imagen->user_id = Auth::user()->id;
        $imagen->save();

        return response()->json(['msg'=>'El imagen prediseñada fue creada exitosamente','imagen' => $imagen]);
    }

    public function update(Request $request,$id)
    {
        $imagen = ImagenDiseno::find($id);
        $imagen->nombre = $request->nombre;
        $imagen->categoria_id = ($request->categoria_id=='') ? null : $request->categoria_id ;

        $nombre = null;
        if($request->imagen)
        {
            File::delete($imagen->url);

            $archivo= $request->imagen;
            $nombre = str_random(50).'.'.$archivo->getClientOriginalExtension();
            $ruta = public_path().'/'.ImagenDiseno::carpeta();
            $archivo->move($ruta, $nombre);

            $imagen->url = ImagenDiseno::carpeta().$nombre;
        }
        
        $imagen->user_id = Auth::user()->id;
        $imagen->save();

        return response()->json(['msg'=>'El imagen prediseñada fue creada exitosamente','imagen' => $imagen]);
    }

    public function show($id)
    {
        $imagen = ImagenDiseno::find($id);
        return response()->json(['imagen' => $imagen]);
    }

    public function destroy($id)
    {
        $imagen = ImagenDiseno::find($id);
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
