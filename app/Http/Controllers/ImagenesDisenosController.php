<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\ImagenDiseno;

class ImagenesDisenosController extends Controller
{
    
    public function index()
    {
    	$imagenes = ImagenDiseno::with('categoria')->with('usuario')->get();
    	return response()->json(['imagenes' => $imagenes]); 
    }

    public function store()
    {

    }

    public function update($id)
    {

    }

    public function show($id)
    {

    }

    public function destroy()
    {

    }
}
