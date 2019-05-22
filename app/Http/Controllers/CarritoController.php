<?php

namespace App\Http\Controllers;

use App\User;
use App\TalleColor;
use App\Articulo;
use App\Carrito;
use Illuminate\Http\Request;
use Auth;

class CarritoController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        if(Auth::check())
        {
            $usuario = Auth::user();
            $carrito = Carrito::paraUsuario($usuario->id)->with("articulo")->with("color")->with("talle")->get();
            foreach ($carrito as $item)
            {
                $encontrado = false;
                $encontrado2 = false;
                $longitud = $item->articulo->imagenesarticulos->count();
                if($longitud>0)
                {
                    //----------------------------------------------------
                    //Buscando la imagen correspondiente al color comprado
                    $i = 0;
                    $imagenes = $item->articulo->imagenesarticulos;
                    while(!$encontrado && $i<$longitud)
                    {
                        if($imagenes[$i]->caracteristica_id==$item->color_id)
                        {
                            $imagen = $imagenes[$i];
                            $encontrado = true;
                        }
                        $i++;
                    }
                    if($encontrado)
                    {
                        $item['imagen'] = $imagen;
                    }
                    //---------------------------------------------------
                    //Buscando la imagen principal
                    $j = 0;
                    $imagenes2 = $item->articulo->imagenesarticulos;
                    while(!$encontrado2 && $j<$longitud)
                    {
                        if($imagenes2[$j]->principal==1)
                        {
                            $imagen2 = $imagenes2[$j];
                            $encontrado2 = true;
                        }
                        $j++;
                    }
                    if($encontrado2)
                    {
                        $item['principal'] = $imagen2;
                    }
                }
            }
            return response()->json(['res' => 1,'carrito' => $carrito]);
        }
        else
        {
            return response()->json(['res' => 2,'msg' => 'Disculpe, inicie sesión para ver su carrito']);
        }
    }

    public function anadircarrito(Request $request)
    {
        if(Auth::check())
        {
            $usuario = Auth::user();
            $articulo = Articulo::find($request->articulo_id);
            if($articulo)
            {
                if($articulo->tipo_cantidad=='general')
                {
                    if($request->cantidad<=$articulo->cantidad)
                    {
                        //Descuento de mi stock directamente de cantidad del artículo
                        $articulo->cantidad = $articulo->cantidad - $request->cantidad;
                        $articulo->save();

                        //Añado a mi carrito
                        $carrito = Carrito::paraUsuario($usuario->id)->paraArticulo($articulo->id)->paraColor($request->color_id)->paraTalle($request->talle_id)->first();
                        
                        if($carrito)
                        {
                            $carrito->cantidad = $carrito->cantidad + $request->cantidad;
                            $carrito->save();
                        }
                        else
                        {
                            $carrito = new Carrito;
                            $carrito->cantidad = $request->cantidad;
                            $carrito->precio = $request->precio;
                            $carrito->disponible = true;
                            $carrito->tipo = 'compra';
                            $carrito->color_id = $request->color_id;
                            $carrito->talle_id = $request->talle_id;
                            $carrito->articulo_id = 1;
                            $carrito->user_id = 1;
                            $carrito->save();
                        }

                        return response()->json(['res' => 1,'msg' => 'Artículo añadido al carrito']);
                    }
                    else
                    {
                        return response()->json(['res' => 2,'msg' => 'Artículo agotado']);
                    }
                }
                else
                {
                    if($articulo->tipo=='ropa')
                    {
                        $talle_color = TalleColor::paraTalle($request->talle_id)->paraColor($request->color_id)->first();
                    }
                    else
                    {
                        $talle_color = TalleColor::paraColor($request->color_id)->first();
                    }

                    if($talle_color)
                    {
                        if($request->cantidad <= $talle_color->cantidad)
                        {
                            //Descuento de mi stock de talle color (mi variante)
                            $talle_color->cantidad = $talle_color->cantidad - $request->cantidad;
                            $talle_color->save();

                            //Añado a mi carrito
                            $carrito = Carrito::paraUsuario($usuario->id)->paraArticulo($articulo->id)->paraColor($request->color_id)->paraTalle($request->talle_id)->first();
                            
                            if($carrito)
                            {
                                $carrito->cantidad = $carrito->cantidad + $request->cantidad;
                                $carrito->save();
                            }
                            else
                            {
                                $carrito = new Carrito;
                                $carrito->cantidad = $request->cantidad;
                                $carrito->precio = $request->precio;
                                $carrito->disponible = true;
                                $carrito->tipo = 'compra';
                                $carrito->color_id = $request->color_id;
                                $carrito->talle_id = $request->talle_id;
                                $carrito->articulo_id = $articulo->id;
                                $carrito->user_id = $usuario->id;
                                $carrito->save();
                            }

                            return response()->json(['res' => 1,'msg' => 'Artículo añadido al carrito']);
                        }
                        else
                        {
                            return response()->json(['res' => 2,'msg' => 'Artículo agotado']);
                        }
                    }
                    else
                    {
                        return response()->json(['res' => 2,'msg' => 'Stock del artículo no encontrado - A-002']);
                    }
                }
            }
            else
            {
                return response()->json(['res' => 2,'msg' => 'Artículo no encontrado']);
            }
        }
        else
        {
            return response()->json(['res' => 2, 'msg' => 'Disculpe, inicie sesión para añadir al carrito']);
        }
    }

    public function eliminarcarrito(Request $request,$id)
    {
        if(Auth::check())
        {
            $usuario = Auth::user();
            $carrito = Carrito::find($id);
            if($carrito)
            {
                $articulo = Articulo::find($carrito->articulo_id);
                if($articulo->tipo_cantidad=='general')
                {
                    //Revierto a mi stock directo al artículo
                    $articulo->cantidad = $articulo->cantidad + $carrito->cantidad;
                    $articulo->save();

                    //Elimino del carrito
                    $carrito->delete();

                    return response()->json(['res' => 1, 'msg' => 'El artículo fue eliminado del carrito']);
                }
                else
                {
                    if($articulo->tipo=='ropa')
                    {
                        $talle_color = TalleColor::paraTalle($carrito->talle_id)->paraColor($carrito->color_id)->first();
                    }
                    else
                    {
                        $talle_color = TalleColor::paraColor($carrito->color_id)->first();
                    }

                    if($talle_color)
                    {
                        //Revierto a mi stock a talle color (mi variante)
                        $talle_color->cantidad = $talle_color->cantidad = $carrito->cantidad;
                        $talle_color->save();

                        //Elimino del carrito
                        $carrito->delete();

                        return response()->json(['res' => 1,'msg' => 'El artículo fue eliminado exitosamente']);
                    }
                    else
                    {
                        return response()->json(['res' => 2,'msg' => 'Stock del artículo no encontrado - A-002']);
                    }
                }
            }
            else
            {
                return response()->json(['res' => 2, 'msg' => 'Artículo no fue encontado en el carrito']);
            }
        }
        else
        {
            return response()->json(['res' => 2, 'msg' => 'Disculpe, inicie sesión para eliminar del carrito']);
        }
    }
}