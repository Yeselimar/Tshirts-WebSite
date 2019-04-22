<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Rubro extends Model
{
    protected $table = 'rubros';

    public function articulos()
    {
        return $this->belongsToMany('App\Articulo','articulos_rubros','articulo_id','rubro_id');
    }
}
