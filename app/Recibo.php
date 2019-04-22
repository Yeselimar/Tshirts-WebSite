<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Recibo extends Model
{
    protected $table = 'recibos';

    public function usuario()
    {
        return $this->belongsTo('App\User','user_id');
    }

    public function detalles()
    {
        return $this->hasMany('App\DetalleRecibo','recibo_id');
    }

    public function impuestosdescuentos()
    {
        return $this->belongsToMany('App\ImpuestoDescuento','impuestos_descuentos_recibos','impuesto_descuento_id','recibo_id');
    }
}
