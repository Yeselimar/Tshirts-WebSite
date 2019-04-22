<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Caracteristica extends Model
{
    protected $table = 'caracteristicas';

    public function grupo()
    {
        return $this->belongsTo('App\Grupo');
    }

    public function articulos()
    {
    	return $this->belongsToMany('App\Articulo','articulos_caracteristicas','articulo_id','caracteristica_id'); 
    }
}
