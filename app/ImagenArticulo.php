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

    public static function carpeta()
    {
        return 'img/articulos/';
    }

    public function scopeParaArticulo($query,$id)
    {
        return $query->where('articulo_id','=',$id);
    }

    public function scopeParaCoordenada($query,$id)
    {
        return $query->where('coordenada_id','=',$id);
    }

    public function scopeParaCaracteristica($query,$id)//color
    {
        return $query->where('caracteristica','=',$id);
    }
}
