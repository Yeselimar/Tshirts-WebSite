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
use File;

use MP;

use App\Http\Controllers\Controller;
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

        //Convirtiendo mi string a json
        $aux = json_decode($request->articulo, true);
        $requests = $aux["articulo"];

        //Validando los colores con las imágenes
        foreach($requests["imagenes_colores"] as $imagen)
        {
            $temporal[ $imagen["selectedColorRelacion"]['id'] ] = 0;

        }
        foreach($requests["imagenes_colores"] as $imagen)
        {
            $temporal[ $imagen["selectedColorRelacion"]['id'] ]++;
        }

        //Validando para devolver una respuesta al frontend
        if(isset($temporal))
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
        $articulo->mask_precio = $requests['mask_precio'];
        $articulo->personalizable = 0;
        $articulo->publicado = $requests['publicado'];
        $articulo->destacado = $requests['destacado'];
        $articulo->save();

        //Rubros
        foreach($requests['rubros'] as $rubro)
        {
            $articulo_rubro = new ArticuloRubro;
            $articulo_rubro->articulo_id = $articulo->id;
            $articulo_rubro->rubro_id = $rubro['id'];
            $articulo_rubro->save();
        }

        //Características Talles
        if(strtoupper($requests['tipo'])==strtoupper("ropa"))
        {
            foreach($requests['talles'] as $talle)
            {
                $articulo_caracteristica = new ArticuloCaracteristica;
                $articulo_caracteristica->articulo_id = $articulo->id;
                $articulo_caracteristica->caracteristica_id = $talle['id'];
                $articulo_caracteristica->save();
            }
        }

        //Características Colores
        foreach($requests['colores'] as $color)
        {
            $articulo_caracteristica = new ArticuloCaracteristica;
            $articulo_caracteristica->articulo_id = $articulo->id;
            $articulo_caracteristica->caracteristica_id = $color['id'];
            $articulo_caracteristica->save();
        }

        //Imágenes Artículos
        $eliminar_imagenes = collect();
        foreach($request->imagenes as $i=>$imagen)
        {
            //Atrapando los errores
            try 
            {
                //Para guardar la imagen del artículo
                if($request->imagenes[$i])
                {
                    $imagen_articulo = new ImagenArticulo;
                    $archivo= $request->imagenes[$i];
                    $nombre = str_random(50).'.'.$archivo->getClientOriginalExtension();
                    $ruta = public_path().'/'.Articulo::carpeta();
                    $archivo->move($ruta, $nombre);

                    $eliminar_imagenes->push(Articulo::carpeta().$nombre);
                }
            }
            catch (\Exception $e)
            {
                //Eliminando los rubros
                $resultado = ArticuloRubro::paraArticulo($articulo->id)->delete();

                //Eliminando las características: Talles, Color y si tiene otra característica asociada
                $resultado = ArticuloCaracteristica::paraArticulo($articulo->id)->delete();

                //Eliminando el artículo
                $articulo->delete();
                
                //Eliminando imágenes subidas
                foreach ($eliminar_imagenes as $imagen)
                {
                    File::delete($imagen);
                }
                return response()->json(['res'=> 0,'msg' => 'Ha ocurrido un error en el servidor: '.$e->getMessage()]);
            }
            
            //Guardando datos de la imagen del artículo
            if($request->imagenes[$i])
            {
                $imagen_articulo->articulo_id = $articulo->id;
                $imagen_articulo->url = Articulo::carpeta().$nombre;
                $imagen_articulo->principal = 0;
                $imagen_articulo->save();
                $auxiliar[$requests["imagenes"][$i]['id']] = $imagen_articulo->id;//para llevar el control de las imágenes
            }

        }

        //Imágenes Artículos actualizando los colores y si es principal
        if(count($requests["imagenes_colores"])!=0)
        {
            foreach($requests["imagenes_colores"] as $imagen_color)
            {
                $imagen_articulo = ImagenArticulo::find($auxiliar[ $imagen_color['file']['id'] ]);

                if($imagen_articulo)
                {
                    $imagen_articulo->caracteristica_id = $imagen_color["selectedColorRelacion"]['id'];
                    $imagen_articulo->principal  = $imagen_color['es_principal'];
                    $imagen_articulo->save();
                }
            }
        }

        //Colocando la imagen principal en caso de que no haya nada en imagenes_colores
        if($requests["id_img_principal"]!=-1)
        {
            $imagen = ImagenArticulo::find($auxiliar[ $requests["id_img_principal"] ]);
            if($imagen)
            {
                $imagen->principal = 1;
                $imagen->save();
            }
        }

        //Guardando las Talles y Colores
        $total_cantidad = 0;
        foreach($requests["talles_colores"] as $index)
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

        return response()->json(['res'=> 1,'msg' => 'El artículo no diseñable fue creado exitosamente']);
    }

    public function updatenodisenable(Request $request, $id)
    {
        //Convirtiendo mi string a json
        $aux = json_decode($request->articulo, true);
        $requests = $aux["articulo"];
        //dd($requests);
        //Validando los colores con las imágenes
        foreach($requests["imagenes_colores"] as $imagen)
        {
            $temporal[ $imagen["selectedColorRelacion"]['id'] ] = 0;

        }
        foreach($requests["imagenes_colores"] as $imagen)
        {
            $temporal[ $imagen["selectedColorRelacion"]['id'] ]++;
        }

        //Validando para devolver una respuesta al frontend
        if(isset($temporal))
        {
            if(count($temporal)!=count($requests["imagenes_colores"]))//Los colores
            {
                return response()->json(["res"=>2,"msg"=>"Disculpe seleccionó una imagen con el mismo color"]);
            }
        }

        //Artículo
        $articulo = Articulo::find($id);
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
        $articulo->mask_precio = $requests['mask_precio'];
        $articulo->personalizable = 0;
        $articulo->publicado = $requests['publicado'];
        $articulo->destacado = $requests['destacado'];

        //Imágenes Artículos
        if(isset($request->imagenes))
        {
            $eliminar_imagenes = collect();
            foreach($request->imagenes as $i=>$imagen)
            {
                //Atrapando los errores
                try 
                {
                    if($request->imagenes[$i])
                    {
                        //Para guardar la imagen del artículo
                        $imagen_articulo = new ImagenArticulo;
                        $archivo= $request->imagenes[$i];
                        $nombre = str_random(50).'.'.$archivo->getClientOriginalExtension();
                        $ruta = public_path().'/'.Articulo::carpeta();
                        $archivo->move($ruta, $nombre);

                        $eliminar_imagenes->push(Articulo::carpeta().$nombre);
                    }
                }
                catch (\Exception $e)
                {
                    //Eliminando imágenes subidas
                    foreach($eliminar_imagenes as $imagen)
                    {
                        File::delete($imagen);
                    }
                    return response()->json(['res'=> 0,'msg' => 'Ha ocurrido un error en el servidor: '.$e->getMessage()]);
                }

                //Guardando datos de la imagen del artículo
                if($request->imagenes[$i])
                {
                    $imagen_articulo->articulo_id = $articulo->id;
                    $imagen_articulo->url = Articulo::carpeta().$nombre;
                    $imagen_articulo->principal = 0;
                    $imagen_articulo->save();
                    $auxiliar[$requests["imagenes"][$i]['id']] = $imagen_articulo->id;//para llevar el control de las imágenes
                }
            }
        }
        
        
        $articulo->save();

        //Eliminando todos los Rubros
        $resultado = ArticuloRubro::paraArticulo($articulo->id)->delete();

        //Rubros
        foreach($requests['rubros'] as $rubro)
        {
            $articulo_rubro = new ArticuloRubro;
            $articulo_rubro->articulo_id = $articulo->id;
            $articulo_rubro->rubro_id = $rubro['id'];
            $articulo_rubro->save();
        }

        //Eliminando todas las Talles y Colores: Eliminando todas las características
        $resultado = ArticuloCaracteristica::paraArticulo($articulo->id)->delete();

        //Características Talles
        if(strtoupper($requests['tipo'])==strtoupper("ropa"))
        {
            foreach($requests['talles'] as $talle)
            {
                $articulo_caracteristica = new ArticuloCaracteristica;
                $articulo_caracteristica->articulo_id = $articulo->id;
                $articulo_caracteristica->caracteristica_id = $talle['id'];
                $articulo_caracteristica->save();
            }
        }

        //Características Colores
        foreach($requests['colores'] as $color)
        {
            $articulo_caracteristica = new ArticuloCaracteristica;
            $articulo_caracteristica->articulo_id = $articulo->id;
            $articulo_caracteristica->caracteristica_id = $color['id'];
            $articulo_caracteristica->save();
        }

        //Eliminando en imágenes artículos
        foreach($requests['imagenes_eliminadas'] as $imagen)
        {
            $imagen_articulo = ImagenArticulo::find($imagen['id']);
            if($imagen_articulo)
            {
                File::delete($imagen_articulo->url);
                $imagen_articulo->delete();
            }
        }

        //Imágenes Artículos
        if(isset($request->imagenes))
        {
            foreach($request->imagenes as $i=>$imagen)
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
                if($request->imagenes[$i])
                {
                    $imagen_articulo->articulo_id = $articulo->id;
                    $imagen_articulo->url = Articulo::carpeta().$nombre;
                    $imagen_articulo->principal = 0;
                    $imagen_articulo->save();
                    $auxiliar[$requests["imagenes"][$i]['id']] = $imagen_articulo->id;//para llevar el control de las imágenes
                }
            }
        }

        //-----------------------------------------------------------
        //Colocar las caracterísica (o color) y  principal en null
        foreach($articulo->imagenesarticulos as $imagen_articulo)
        {
            $imagen_articulo->caracteristica_id = null;
            $imagen_articulo->principal = 0;
            $imagen_articulo->save();
            $auxiliar[$imagen_articulo->id] = $imagen_articulo->id;//para llevar el control de las imágenes
        }
        //-----------------------------------------------------------

        //Imágenes Artículos actualizando los colores y si es principal
        if(count($requests["imagenes_colores"])!=0)
        {
            foreach($requests["imagenes_colores"] as $imagen_color)
            {
                $tmp_id = $auxiliar[ $imagen_color['file']['id'] ];
                
                if(isset($tmp_id))
                {
                    $imagen_articulo = ImagenArticulo::find($auxiliar[ $imagen_color['file']['id'] ]);
                    $imagen_articulo->caracteristica_id = $imagen_color["selectedColorRelacion"]['id'];
                    $imagen_articulo->principal  = $imagen_color['es_principal'];
                    $imagen_articulo->save();
                }
                else
                {
                    $imagen_articulo = ImagenArticulo::find($imagen_color['file']['id']);
                    $imagen_articulo->principal  = $imagen_color['es_principal'];
                    $imagen_articulo->save();
                }
            }
        }
        //Colocando la imagen principal en caso de que no haya nada en imagenes_colores
        if($requests["id_img_principal"]!=-1)
        {
            $imagen = ImagenArticulo::find($auxiliar[ $requests["id_img_principal"] ]);
            if($imagen)
            {
                $imagen->principal = 1;
                $imagen->save();
            }
        }
        
        //Eliminando los Talles Colores
        $resultado = TalleColor::paraArticulo($articulo->id)->delete();

        //Guardando las Talles y Colores
        $total_cantidad = 0;
        foreach($requests["talles_colores"] as $index)
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

        return response()->json(['res'=> 1,'msg' => 'El artículo no disenable fue actualizado exitosamente']);
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

    public function destroy($id)
    {
        $articulo = Articulo::find($id);
        if($articulo)
        {
            if($articulo->detallesrecibos->count()==0)
            {
                //Eliminando los rubros
                $resultado = ArticuloRubro::paraArticulo($articulo->id)->delete();

                //Eliminando las características: Talles, Color y si tiene otra característica asociada
                $resultado = ArticuloCaracteristica::paraArticulo($articulo->id)->delete();

                //Eliminando las Talles Colores
                $resultado = TalleColor::paraArticulo($articulo->id)->delete();

                //Eliminando las imágenes artículos
                foreach($articulo->imagenesarticulos as $articulo_imagen)
                {
                    File::delete($articulo_imagen->url);
                    $articulo_imagen->delete();
                }

                //Eliminando el artículo
                $articulo->delete();

                if($articulo->banners->count()==0)
                {
                    return response()->json(['res' => 1, "msg" => "El artículo fue eliminado exitosamente"]);
                }
                else
                {
                    return response()->json(['res' => 1, "msg" => "El artículo y el banner fue eliminado exitosamente"]);
                }
            }
            else
            {
                return response()->json(['res' => 2, "msg" => "Error A-001"]);
            }
        }
        else
        {
            return response()->json(['res' => 2, "msg" => "Disculpe, el artículo no existe"]);
        }

    }
    public function getarticulosdisenables(){
        $articulos_d = Articulo::personalizable(1)->with('imagenesarticulos')->with('rubros')->get();
        foreach ($articulos_d as $key => $articulo)
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
                        $imagen = $imagenes[$i]->url;
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
        return response()->json(['articulos_d' => $articulos_d]);
    }
    public function articuloseleccionado($id)
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
                        array_push($talles,$auxiliar->valor);
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

}
