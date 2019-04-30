<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Rubro;

class RubrosController extends Controller
{
    public function index()
    {
    	$rubros = Rubro::with("articulos")->get();
    	return response()->json(['rubros' => $rubros]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre'    => 'required',
        ]);
    	$rubro = new Rubro;
    	$rubro->nombre = $request->nombre;
    	$rubro->principal = ($request->principal=='true' ? true : false);
    	$rubro->save();
    	return response()->json(['msg'=>'El rubro fue creado exitosamente','rubro' => $rubro]);
    }

    public function update(Request $request,$id)
    {
        $request->validate([
            'nombre'    => 'required',
        ]);
    	$rubro = Rubro::find($id);
    	if($rubro)
    	{
    		$rubro->nombre = $request->nombre;
	    	$rubro->principal = ($request->principal=='true' ? true : false);
	    	$rubro->save();
	    	return response()->json(['msg'=>'El rubro fue actualizado exitosamente','rubro' => $rubro]);
    	}
    	else
    	{
    		return response()->json(['msg'=>'Ha ocurrido un error inesperado']);
    	}
    }

    public function show($id)
    {
    	$rubro = Rubro::find($id);
    	return response()->json(['rubro' => $rubro]);
    }

    public function destroy($id)
    {
    	$rubro = Rubro::find($id);
    	if($rubro)
    	{
    		if($rubro->articulos->count()==0)
    		{
    			$rubro->delete();
    			return response()->json(['res'=>1,'msg'=>'El rubro fue eliminado exitosamente']);
    		}
    		else
    		{
    			return response()->json(['res'=>2,'msg'=>'El rubro no puede ser eliminado']);
    		}
    	}
    	else
    	{
    		return response()->json(['msg'=>'Ha ocurrido un error inesperado']);
    	}
    }
}
