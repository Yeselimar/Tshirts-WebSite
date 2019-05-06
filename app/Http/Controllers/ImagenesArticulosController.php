<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImagenesArticulosController extends Controller
{
    public function posicionimagen()
    {
    	$posicion = [];
		$objeto1['id'] = "frontal";
		$objeto1['nombre'] = "Frontal";

		array_push($posicion,$objeto1);

		$objeto2['id'] = "reverso";
		$objeto2['nombre'] = "Reverso";

		array_push($posicion,$objeto2);
		
    	return response()->json(['posicion' => $posicion]); 
    }
}
