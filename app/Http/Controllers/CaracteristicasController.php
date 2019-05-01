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

    public function caracteristicaporgrupo($grupo_id)
    {
        $caracteristicas = Caracteristica::paraGrupo($grupo_id)->with('grupo')->with('articulos')->get();
        //if($caracteristicas)
        return response()->json(['caracteristicas' => $caracteristicas]);
    }

    public function store(Request $request)
    {
    	$caracteristica = new Caracteristica;
    	$caracteristica->valor = $request->valor;
        $caracteristica->grupo_id = $request->grupo_id;
        if($request->es_color=='1' || $request->es_color==1)//si es el grupo es color: Guardo el color
        {
            $caracteristica->color = $request->color;
        }
    	$caracteristica->save();
    	return response()->json(['msg'=>'La característica fue creada exitosamente','caracteristica' => $caracteristica]);
    }

    public function update(Request $request,$id)
    {
        $caracteristica = Caracteristica::find($id);
        $caracteristica->valor = $request->valor;
        $caracteristica->grupo_id = $request->grupo_id;
        if($request->es_color=='1' || $request->es_color==1)//si es el grupo es color: Guardo el color
        {
            $caracteristica->color = $request->color;
        }
        $caracteristica->save();
        return response()->json(['msg'=>'La característica fue actualizada exitosamente','caracteristica' => $caracteristica]);
    }

    public function show()
    {
        $caracteristica = Caracteristica::find($id);
        return response()->json(['caracteristica' => $caracteristica]);
    }

    public function destroy($id)
    {
        $caracteristica = Caracteristica::find($id);
        if($caracteristica)
        {
            if($caracteristica->articulos->count()==0)
            {
                $caracteristica->delete();
                return response()->json(['res'=>1,'msg'=>'La característica fue eliminada exitosamente']);
            }
            else
            {
                return response()->json(['res'=>2,'msg'=>'La característica no puede ser eliminada']);
            }
        }
        else
        {
            return response()->json(['msg'=>'Ha ocurrido un error inesperado']);
        }
    }
}
