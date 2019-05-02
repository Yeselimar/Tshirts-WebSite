<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Articulo;

class ArticulosController extends Controller
{
    public function index()
    {
    	$articulos = Articulo::with('imagenesarticulos')->with('rubros')->get();
    	return response()->json(['articulos' => $articulos]); 
    }

    public function store()
    {

    }

    public function update()
    {

    }

    public function show()
    {
    	
    }

    public function destroy()
    {

    }

}
