<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    protected $table = 'categorias';

    public function imagenespredisenadas()
    {
        return $this->hasMany('App\ImagenPredisenada','categoria_id');
    }
}
