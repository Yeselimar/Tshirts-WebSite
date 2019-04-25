<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Caracteristica;

class CaracteristicasController extends Controller
{
    public function index()
    {
    	$caracteristicas = Caracteristica::with('grupo')->with('articulos')->get();
    	return response()->json(['caracteristicas' => $caracteristicas]); 
    }

    public function store(Request $request)
    {
    	$caracteristica = new Caracteristica;
    	$caracteristica->valor = $request->valor;
    	$caracteristica->color = ($request->grupo_id==1) ? $request->color : null;//El grupo color debe ser con id igual a 1
    	$caracteristica->grupo_id = $request->grupo_id;
    	$caracteristica->save();
    	return response()->json(['msg'=>'La caracteristica fue creada exitosamente','caracteristica' => $caracteristica]);
    }
}
