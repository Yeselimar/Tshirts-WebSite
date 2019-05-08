<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Articulo;
use App\ImageArticulo;
use App\TalleColor;
use App\ArticuloRubro;
use App\ArticuloCaracteristica;
use App\ImagenArticulo;

class ArticulosController extends Controller
{
    public function index()
    {
    	$articulos = Articulo::with('imagenesarticulos')->with('rubros')->get();
        foreach ($articulos as $key => $articulo)
        {
            $encontrado = false;
            $longitud = $articulo->imagenesarticulos->count();
            if($longitud>0)
            {
                $i = 0;
                $imagenes = $articulo->imagenesarticulos;
                while(!$encontrado && $i<$longitud)
                {
                    if($imagenes[$i]->principal==1)
                    {
                        $imagen = $imagenes[$i];
                        $encontrado = true;
                    }
                    $i++;
                }
                if($encontrado)
                {
                    $articulo['principal'] = $imagen;
                }
                //¿Qué pasa si no encuentro la imagen principal?
            }
        }
    	return response()->json(['articulos' => $articulos]); 
    }

    public function todosparabanner()
    {
        $articulos = Articulo::all();
        return response()->json(['articulos' => $articulos]); 
    }

    public function imagenprincipal($id)
    {
        
        $imagen = null;
        $articulo = Articulo::find($id);
        return response()->json(['imagen' => $imagen]); 
    }

    public function storenodisenable(Request $request)
    {
        //$auxiliar["ajsha"] = 5;
        //$auxiliar["aksj"] = 6;
        //return $auxiliar["aksj"];//retorna el 6

        dd($request);
        //Artículo
        $articulo = new Articulo;
        $articulo->tipo = $request->articulo['tipo'];
        $articulo->otros = (strtoupper($request->articulo['tipo'])==strtoupper("otros")) ? $request->articulo['otros'] : null; 
        $articulo->nombre = $request->articulo['nombre'];
        $articulo->marca = $request->articulo['marca'];
        $articulo->descripcion = $request->articulo['descripcion'];
        $articulo->tipo_cantidad = $request->articulo['tipo_cantidad'];
        $articulo->cantidad = (strtoupper($request->articulo['tipo_cantidad'])==strtoupper("general")) ? $request->articulo['cantidad'] : 0;
        $articulo->precio_general = $request->articulo['precio_general'];
        $articulo->personalizable = 0;
        $articulo->publicado = $request->articulo['publicado'];
        $articulo->destacado = $request->articulo['destacado'];
        $articulo->save();

        //Rubros
        foreach ($request->articulo['rubros'] as $rubro)
        {
            $articulo_rubro = new ArticuloRubro;
            $articulo_rubro->articulo_id = $articulo->id;
            $articulo_rubro->rubro_id = $rubro['id'];
            $articulo_rubro->save();
        }

        //Características Talles
        if(strtoupper($request->articulo['tipo'])==strtoupper("ropa"))
        {
            foreach ($request->articulo['talles'] as $talle)
            {
                $articulo_caracteristica = new ArticuloCaracteristica;
                $articulo_caracteristica->articulo_id = $articulo->id;
                $articulo_caracteristica->caracteristica_id = $talle['id'];
                $articulo_caracteristica->save();
            }
        }
        

        //Características Colores
        foreach ($request->articulo['colores'] as $color)
        {
            $articulo_caracteristica = new ArticuloCaracteristica;
            $articulo_caracteristica->articulo_id = $articulo->id;
            $articulo_caracteristica->caracteristica_id = $color['id'];
            $articulo_caracteristica->save();
        }
        
        //Imágenes Artículos
        foreach ($request->articulo['imagenes'] as $i=>$imagen)
        {
            $imagen_articulo = new ImagenArticulo;

            if($request->imagenes[$i])
            {
                //Para guardar la imagen del artículo
                $archivo= $request->imagenes[$i];
                $nombre = str_random(50).'.'.$archivo->getClientOriginalExtension();
                $ruta = public_path().'/'.ImagenArticulo::carpeta();
                $archivo->move($ruta, $nombre);
            }
            
            //Guardando datos de la imagen del artículo
            $imagen_articulo->articulo_id = $articulo->id;
            $imagen_articulo->url = ArticuloArticulo::carpeta().$nombre;
            $imagen_articulo->principal = 0;
            $imagen_articulo->save();
                        
            $auxiliar[$imagen['id']] = $imagen_articulo->id;//para llevar el control de las imágenes
        }

        //Imágenes Artículos actualizando los colores
        foreach($request->imagenes_colores as $imagen_color)
        {
            $imagen_articulo = ImagenArticulo::paraArticulo($auxiliar[ $imagen_color['imagen']['id'] ])->first();//duda con el nombre imagen
            $imagen_articulo->caracteristica_id = $imagen_color['color']['id'];//duda con el nombre color
            $imagen_articulo->posicion = $imagen_color['posicion'];
            $imagen_articulo->principal  = $imagen_color['es_principal'];//duda como viaja este booleano
            $imagen_articulo->save();
        }

        //Guardando las Talles y Colores 
        $total_cantidad = 0;
        foreach ($request->talles_colores as $talle_color)
        {
            $talle_color = new TalleColor;
            $talle_color->articulo_id = $articulo->id;

            if(strtoupper($request->articulo['tipo'])==strtoupper("ropa"))
            {
                $talle_color->caracteristica_id = $talle_color['talle']['id']; //talle
            }

            $talle_color->caracteristica_id = $talle_color['color']['id']; //color
            $talle_color->cantidad = $talle_color['cantidad'];
            $talle_color->precio = $talle_color['precio'];
            $talle_color->save();

            $total_cantidad = $total_cantidad + $taller_color->cantidad;
        }

        //Si es por variante debo asignarle a cantidad la suma de la cantidad de cada una de las variantes.
        if($request->talles_colores)//duda
        {
            $articulo->cantidad  = $total_cantidad;
            $articulo->save();
        }

        return response()->json(['msg' => 'El artículo no diseñable fue creado exitosamente.','res'=> 1]); 
    }

    public function storedisenable()
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
