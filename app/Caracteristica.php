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
    	return $this->belongsToMany('App\Articulo','articulos_caracteristicas'); 
    }

    public function scopeParaGrupo($query,$id)
    {
        return $query->where('grupo_id','=',$id);
    }
}
