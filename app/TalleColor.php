<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TalleColor extends Model
{
    protected $table = 'talles_colores';

    public function articulo()
    {
        return $this->belongsTo('App\Articulo','articulo_id');
    }

    public function color()
    {
        return $this->belongsTo('App\Caracteristica','color_id');
    }

    public function talle()
    {
        return $this->belongsTo('App\Caracteristica','talle_id');
    }
}
