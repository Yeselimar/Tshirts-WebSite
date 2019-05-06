<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\ImagenArticulo;
use App\Rubro;
use App\Caracteristica;

class Articulo extends Model
{
    protected $table = 'articulos';

    public function imagenesarticulos()
    {
        return $this->hasMany('App\ImagenArticulo','articulo_id');
    }
    
    public function rubros()
    {
        return $this->belongsToMany('App\Rubro','articulos_rubros','articulo_id','rubro_id');
    }
    
    public function caracteristicas()
    {
        return $this->belongsToMany('App\Caracteristica','articulos_caracteristicas','articulo_id','caracteristica_id');
    }
    
    public function tallescolores()
    {
        return $this->hasMany('App\TalleColor','articulo_id');
    }
}
