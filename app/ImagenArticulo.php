<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ImagenArticulo extends Model
{
    protected $table = 'imagenes_articulos';

    public function coordenada()
    {
    	return $this->belongsTo('App\Coordenada');
    }

    public function articulo()
    {
    	return $this->belongsTo('App\Articulo');
    }
}
