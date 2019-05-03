<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Categoria;

class CategoriasController extends Controller
{
    public function index()
    {
    	$categorias = Categoria::all();
    	return response()->json(['categorias' => $categorias]); 
    }
}
