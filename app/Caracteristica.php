<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Caracteristica extends Model
{
    protected $table = 'caracteristicas';

    public function grupo()
    {
        return $this->belongsTo('App\Grupo');
    }
}
