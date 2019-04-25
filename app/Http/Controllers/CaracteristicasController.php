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
}
