<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ArticuloCaracteristica extends Model
{
    protected $table = 'articulos_caracteristicas';

    public function scopeParaArticulo($query,$id)
    {
        return $query->where('articulo_id','=',$id);
    }

    public function scopeParaCaracteristica($query,$id)
    {
        return $query->where('caracteristica_id','=',$id);
    }
}
