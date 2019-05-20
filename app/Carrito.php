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

    public function scopeParaArticulo($query,$id)
    {
        return $query->where('articulo_id','=',$id);
    }

    public function scopeParaColor($query,$id)
    {
        return $query->where('color_id','=',$id);
    }

    public function scopeParaTalle($query,$id)
    {
        return $query->where('talle_id','=',$id);
    }
}
