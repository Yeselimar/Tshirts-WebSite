<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    protected $table = 'categorias';

    public function imagenesdisenadas()
    {
        return $this->hasMany('App\ImagenDiseno','categoria_id');
    }
}
