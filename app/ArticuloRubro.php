<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ArticuloRubro extends Model
{
    protected $table = 'articulos_rubros';

    public function scopeParaArticulo($query,$id)
    {
        return $query->where('articulo_id','=',$id);
    }

    public function scopeParaRubro($query,$id)
    {
        return $query->where('rubro_id','=',$id);
    }
}
