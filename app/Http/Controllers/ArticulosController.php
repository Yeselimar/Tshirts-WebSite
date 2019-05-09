<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Articulo;
use App\ImageArticulo;
use App\TalleColor;
use App\ArticuloRubro;
use App\ArticuloCaracteristica;
use App\ImagenArticulo;
use App\Caracteristica;

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

    public function disenables()
    {
        $articulos = Articulo::personalizable(1)->get();
        return response()->json(['articulos' => $articulos]);
    }

    public function nodisenables()
    {
        $articulos = Articulo::personalizable(0)->get();
        return response()->json(['articulos' => $articulos]);
    }

    public function destacados()
    {
        $articulos = Articulo::destacados(1)->get();
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

    public function editnodisenable($id)
    {
        $articulo = Articulo::with("imagenesarticulos")->with("rubros")->with("caracteristicas")->with("tallescolores")->find($id);
        if($articulo)
        {
            //talles y colores
            $colores = [];
            $talles = [];
            foreach ($articulo->caracteristicas as $caracteristica)
            {
                if(strtolower($caracteristica->grupo->nombre)==strtolower("color"))
                {
                    $auxiliar  = Caracteristica::find($caracteristica->id);
                    array_push($colores,$auxiliar);
                }
                else
                {
                    if(strtolower($caracteristica->grupo->nombre)==strtolower("talle"))
                    {
                        $auxiliar  = Caracteristica::find($caracteristica->id);
                        array_push($talles,$auxiliar);
                    }
                }
            }
            $articulo["talles"] = $talles;
            $articulo["colores"] = $colores;

            //imágenes colores
            $imagenes_colores = [];
            foreach($articulo->imagenesarticulos as $imagen)
            {
                if($imagen->caracteristica_id!=null)
                {
                    array_push($imagenes_colores, $imagen);
                }
            }
            $articulo['imagenes_colores'] = $imagenes_colores;

            return response()->json(['res'=>1,'articulo' => $articulo]);
        }
        else
        {
            return response()->json(['res'=>2,'msg' => "Artículo no encontrado"]);
        }
    }

    public function todosparabanner()
    {
        $articulos = Articulo::all();
        return response()->json(['articulos' => $articulos]);
    }

    public function imagenprincipal($id)//No usado
    {
        $imagen = null;
        $articulo = Articulo::find($id);
        return response()->json(['imagen' => $imagen]);
    }

    public function storenodisenable(Request $request)
    {
        //dd($request);
        //Convirtiendo mis string a json
        $aux = json_decode($request->articulo, true);
        $requests = $aux["articulo"];

        //Validando los colores con las imágenes
        $encontrado = false;
        foreach($requests["imagenes_colores"] as $imagen)
        {
            $temporal[ $imagen["selectedColorRelacion"]['id'] ] = 0;

        }
        foreach($requests["imagenes_colores"] as $imagen)
        {
            $temporal[ $imagen["selectedColorRelacion"]['id'] ]++;
        }

        //Validando para devolver una respuesta al frontend 
        if($temporal)
        {
            if(count($temporal)!=count($requests["imagenes_colores"]))//Los colores
            {
                return response()->json(["res"=>2,"msg"=>"Disculpe seleccionó una imagen con el mismo color"]);
            }
        }

        //Artículo
        $articulo = new Articulo;
        $articulo->tipo = strtolower($requests['tipo']);
        $articulo->otros = (strtoupper($requests['tipo'])==strtoupper("otros")) ? $requests['otros'] : null; 
        $articulo->nombre = $requests['nombre'];
        $articulo->marca = $requests['marca'];
        $articulo->descripcion = $requests['descripcion'];
        if(strtoupper($requests['tipo_cantidad'])==strtoupper("general"))
        {
            $articulo->tipo_cantidad = strtolower($requests['tipo_cantidad']);
        }
        else
        {
            $articulo->tipo_cantidad = strtolower("por_variante");
        }
        $articulo->cantidad = (strtoupper($requests['tipo_cantidad'])==strtoupper("general")) ? $requests['cantidad'] : 0;
        $articulo->mask_cantidad = (strtoupper($requests['tipo_cantidad'])==strtoupper("general")) ? $requests['mask_cantidad'] : '';
        $articulo->precio_general = $requests['precioGeneral'];
        $articulo->mask_precio = $requests['F'];
        $articulo->personalizable = 0;
        $articulo->publicado = $requests['publicado'];
        $articulo->destacado = $requests['destacado'];
        $articulo->save();

        //Rubros
        foreach ($requests['rubros'] as $rubro)
        {
            $articulo_rubro = new ArticuloRubro;
            $articulo_rubro->articulo_id = $articulo->id;
            $articulo_rubro->rubro_id = $rubro['id'];
            $articulo_rubro->save();
        }

        //Características Talles
        if(strtoupper($requests['tipo'])==strtoupper("ropa"))
        {
            foreach ($requests['talles'] as $talle)
            {
                $articulo_caracteristica = new ArticuloCaracteristica;
                $articulo_caracteristica->articulo_id = $articulo->id;
                $articulo_caracteristica->caracteristica_id = $talle['id'];
                $articulo_caracteristica->save();
            }
        }
        
        //Características Colores
        foreach ($requests['colores'] as $color)
        {
            $articulo_caracteristica = new ArticuloCaracteristica;
            $articulo_caracteristica->articulo_id = $articulo->id;
            $articulo_caracteristica->caracteristica_id = $color['id'];
            $articulo_caracteristica->save();
        }

        //Imágenes Artículos
        foreach ($request->imagenes as $i=>$imagen)
        {
            $imagen_articulo = new ImagenArticulo;
            if($request->imagenes[$i])
            {
                //Para guardar la imagen del artículo
                $archivo= $request->imagenes[$i];
                $nombre = str_random(50).'.'.$archivo->getClientOriginalExtension();
                $ruta = public_path().'/'.Articulo::carpeta();
                $archivo->move($ruta, $nombre);
            }
            //Guardando datos de la imagen del artículo
            $imagen_articulo->articulo_id = $articulo->id;
            $imagen_articulo->url = Articulo::carpeta().$nombre;
            $imagen_articulo->principal = 0;
            $imagen_articulo->save();
            $auxiliar[$requests["imagenes"][$i]['id']] = $imagen_articulo->id;//para llevar el control de las imágenes
        }

        //Imágenes Artículos actualizando los colores y si es principal
        foreach($requests["imagenes_colores"] as $imagen_color)
        {
            $imagen_articulo = ImagenArticulo::find($auxiliar[ $imagen_color['file']['id'] ]);
            if($imagen_articulo)
            {
                //verificar que no exista para ese color 
                $imagen_articulo->caracteristica_id = $imagen_color["selectedColorRelacion"]['id'];
                $imagen_articulo->principal  = $imagen_color['es_principal'];
                $imagen_articulo->save();
            }
        }

        //Guardando las Talles y Colores
        $total_cantidad = 0;
        foreach ($requests["talles_colores"] as $index)
        {
            $talle_color = new TalleColor;
            $talle_color->articulo_id = $articulo->id;

            if(strtoupper($requests['tipo'])==strtoupper("ropa"))
            {
                $talle_color->talle_id = $index['selectedTalleVariante']['id']; //talle
            }
            $talle_color->color_id = $index['selectedColorVariante']['id']; //color
            $talle_color->cantidad = $index['cantidadVariante'];
            $talle_color->precio = $index['precioVariante'];
            $talle_color->save();

            $total_cantidad = $total_cantidad + $talle_color->cantidad;
        }

        //Si es por variante debo asignarle a cantidad la suma de la cantidad de cada una de las variantes.
        if(count($requests['talles_colores'])>0)//si hay algo en talles colores
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
    public function getarticulosdisenables(){
        $articulos_nd = Articulo::where('personalizable', '=', true)->with('imagenesarticulos')->with('rubros')->get();
        return response()->json(['articulos_nd' => $articulos_nd]);
    }

}
