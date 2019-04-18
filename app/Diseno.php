<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Diseno extends Model
{
    protected $table = 'disenos';
    
    public function imagendiseno()
    {
        return $this->belongsTo('App\ImagenDiseno','imagen_diseno_id');
    }

    public function imagenarticulo()
    {
        return $this->belongsTo('App\ImagenArticulo','imagen_articulo_id');
    }
}
