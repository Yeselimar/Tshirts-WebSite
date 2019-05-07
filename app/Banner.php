<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    protected $table = 'banner';

    public function articulo()
    {
        return $this->belongsTo('App\Articulo','articulo_id');
    }

    public static function carpeta()
    {
        return 'img/banner/';
    }
}
