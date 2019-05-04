<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ImagenDiseno extends Model
{
    protected $table = 'imagenes_disenos';

    public function categoria()
    {
        return $this->belongsTo('App\Categoria');
    }

    public function usuario()
    {
        return $this->belongsTo('App\User','user_id');
    }

    public static function carpeta()
    {
        return 'img/predisenadas/';
    }
}
