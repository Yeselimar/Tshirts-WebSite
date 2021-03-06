<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Banner;
use File;
use DB;
class BannerController extends Controller
{
    public function index()
    {
    	$banners = Banner::with("articulo")->get();
    	return response()->json(['banners' => $banners]); 
    }

    public function todosdisenables()
    {
        $banners = Banner::all();
        $banners = Banner::join("articulos","banner.articulo_id","=","articulos.id")
            ->where('articulos.personalizable','=',1)
            ->select('*', DB::raw('articulos.descripcion as descripcion_articulo, banner.descripcion as descripcion_banner'))
        ->get();
        return response()->json(['banners' => $banners]); 
    }

    public function todosnodisenables()
    {
        $banners = Banner::all();
        $banners = Banner::join("articulos","banner.articulo_id","=","articulos.id")
            ->select('*', DB::raw('articulos.descripcion as descripcion_articulo, banner.descripcion as descripcion_banner'))
            ->where('articulos.personalizable','=',0)
        ->get();
        return response()->json(['banners' => $banners]); 
    }

    public function store(Request $request)
    {
    	$banner = new Banner;
    	$banner->descripcion = $request->descripcion;
    	$banner->articulo_id = $request->articulo_id;

    	$nombre = null;
        if($request->imagen)
        {
            try 
            {
                $archivo= $request->imagen;
                $nombre = str_random(50).'.'.$archivo->getClientOriginalExtension();
                $ruta = public_path().'/'.Banner::carpeta();
                $archivo->move($ruta, $nombre);
            }
            catch (\Exception $e)
            {
                return response()->json(['res'=> 0,'msg' => 'Ha ocurrido un error en el servidor: '.$e->getMessage()]);
            }
            
        }
        
        $banner->imagen = Banner::carpeta().$nombre;
        $banner->save();

        return response()->json(['msg'=>'El banner fue creado exitosamente','banner' => $banner]);
    }

    public function update(Request $request, $id)
    {
        $banner = Banner::find($id);
        $banner->descripcion = $request->descripcion;
        $banner->articulo_id = $request->articulo_id;

        $nombre = null;

        if($request->imagen)
        {
            try
            {
                File::delete($banner->imagen);

                $archivo= $request->imagen;
                $nombre = str_random(50).'.'.$archivo->getClientOriginalExtension();
                $ruta = public_path().'/'.Banner::carpeta();
                $archivo->move($ruta, $nombre);

                $banner->imagen = Banner::carpeta().$nombre;
            }
            catch (\Exception $e)
            {
                return response()->json(['res'=> 0,'msg' => 'Ha ocurrido un error en el servidor: '.$e->getMessage()]);
            }
        }
        
        $banner->save();

        return response()->json(['msg'=>'El banner fue actualizado exitosamente','banner' => $banner]);
    }

    public function destroy($id)
    {
        $banner = Banner::find($id);
        if($banner)
        {
            File::delete($banner->imagen);
            $banner->delete();
            return response()->json(['res'=>1,'msg'=>'El banner fue eliminado exitosamente']);
        }
        else
        {
            return response()->json(['res'=>2,'msg'=>'Ha ocurrido un error inesperado']);
        }
    }
}
