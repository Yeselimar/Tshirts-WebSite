<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ImagenDiseno extends Model
{
    protected $table = 'imagenes_predisenadas';

    public function categoria()
    {
        return $this->belongsTo('App\Categoria');
    }

    public function usuario()
    {
        return $this->belongsTo('App\User','user_id');
    }

    public function disenos()//Cuantos diseños hay con esa una determinada imagen
    {
        return $this->hasMany('App\Diseno','imagen_predisenada_id');
    }

    public static function carpeta()
    {
        return 'img/predisenadas/';
    }
}
