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

    public function color()
    {
        return $this->belongsTo('App\Caracteristica','color_id');
    }
    public function talle()
    {
        return $this->belongsTo('App\Caracteristica','talle_id');
    }

    public function scopeParaUsuario($query,$id)
    {
        return $query->where('user_id','=',$id);
    }
}
