<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Carrito extends Model
{
    protected $table = 'carritos';

    public function articulo()
    {
        return $this->belongsTo('App\Articulo','articulo_id');
    }

    public function usuario()
    {
        return $this->belongsTo('App\User','user_id');
    }
}
