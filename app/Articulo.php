<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\ImagenArticulo;
use App\Rubro;
use App\Caracteristica;

class Articulo extends Model
{
    protected $table = 'articulos';

    public function imagenesarticulos()
    {
        return $this->hasMany('App\ImagenArticulo','articulo_id')->with('color')->with('coordenada');
    }
    
    public function rubros()
    {
        return $this->belongsToMany('App\Rubro','articulos_rubros','articulo_id','rubro_id');
    }
    
    public function caracteristicas()
    {
        return $this->belongsToMany('App\Caracteristica','articulos_caracteristicas','articulo_id','caracteristica_id');
    }
    
    public function tallescolores()
    {
        return $this->hasMany('App\TalleColor','articulo_id')->with('color')->with('talle');
    }

    public function banners()
    {
        return $this->hasMany('App\Banner','articulo_id');
    }

    public function detallesrecibos()
    {
        return $this->hasMany('App\DetalleRecibo','articulo_id');
    }

    public function scopePersonalizable($query,$bandera)
    {
        return $query->where('personalizable','=',$bandera);
    }

    public function scopeDestacado($query,$bandera)
    {
        return $query->where('destacado','=',$bandera);
    }
    public function scopePublicado($query,$bandera)
    {
        return $query->where('publicado','=',1);
    }

    public function esPersonalizable()
    {
        return $this->personalizable==1;
    }

    public static function carpeta()
    {
        return 'img/articulos/';
    }
}
