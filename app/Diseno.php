<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Diseno extends Model
{
    protected $table = 'disenos';
    
    public function imagenpredisenadas()
    {
        return $this->belongsTo('App\ImagenPredisenada','imagen_predisenada_id');
    }

    public function imagenarticulo()
    {
        return $this->belongsTo('App\ImagenArticulo','imagen_articulo_id');
    }
}
