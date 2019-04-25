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

    public function store(Request $request)
    {
    	$grupo = new Grupo;
    	$grupo->nombre = $request->nombre;
    	$grupo->save();
    	return response()->json(['msg'=>'El grupo fue creado exitosamente','grupo' => $grupo]);
    }

    public function update(Request $request,$id)
    {
    	$grupo = Grupo::find($id);
    	if($grupo)
    	{
    		$grupo->nombre = $request->nombre;
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
