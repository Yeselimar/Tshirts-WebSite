<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Grupo extends Model
{
    protected $table = 'grupos';

    public function caracteristicas()
    {
        return $this->hasMany('App\Caracteristica','grupo_id');
    }
}
