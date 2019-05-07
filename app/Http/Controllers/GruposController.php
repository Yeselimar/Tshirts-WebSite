<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Grupo;

class GruposController extends Controller
{
    public function index()
    {
    	$grupos = Grupo::with('caracteristicas')->get();
    	return response()->json(['grupos' => $grupos]); 
    }

    public function talles()
    {
        $nombre = "talle";
        $nombre = strtolower($nombre);
        $grupo = Grupo::whereRaw('LOWER(nombre) = ?', [$nombre])->first();
        return response()->json(['talles' => $grupo->caracteristicas]); 
    }

    public function colores()
    {
        $nombre = "color";
        $nombre = strtolower($nombre);
        $grupo = Grupo::whereRaw('LOWER(nombre) = ?', [$nombre])->first();
        return response()->json(['colores' => $grupo->caracteristicas]); 
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre'    => 'required',
        ]);
    	$grupo = new Grupo;
    	$grupo->nombre = $request->nombre;
        $grupo->es_color = ($request->es_color=='true' ? true : false);
    	$grupo->save();
    	return response()->json(['msg'=>'El grupo fue creado exitosamente','grupo' => $grupo]);
    }

    public function update(Request $request,$id)
    {
        $request->validate([
            'nombre'    => 'required',
        ]);
    	$grupo = Grupo::find($id);
    	if($grupo)
    	{
    		$grupo->nombre = $request->nombre;
            $grupo->es_color = ($request->es_color=='true' ? true : false);
	    	$grupo->save();
	    	return response()->json(['msg'=>'El grupo fue actualizado exitosamente','grupo' => $grupo]);
    	}
    	else
    	{
    		return response()->json(['msg'=>'Ha ocurrido un error inesperado']);
    	}
    }

    public function show($id)
    {
    	$grupo = Grupo::find($id);
    	return response()->json(['grupo' => $grupo]);
    }

    public function destroy($id)
    {
    	$grupo = Grupo::find($id);
    	if($grupo)
    	{
    		if($grupo->caracteristicas->count()==0)
    		{
    			$grupo->delete();
    			return response()->json(['res'=>1,'msg'=>'El grupo fue eliminado exitosamente']);
    		}
    		else
    		{
    			return response()->json(['res'=>2,'msg'=>'El grupo no puede ser eliminado']);
    		}
    	}
    	else
    	{
    		return response()->json(['msg'=>'Ha ocurrido un error inesperado']);
    	}
    }
}
