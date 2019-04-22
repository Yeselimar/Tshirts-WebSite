<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ImpuestoDescuento extends Model
{
    protected $table = 'impuestos_descuentos';

    public function recibos()
    {
        return $this->belongsToMany('App\Recibo','impuestos_descuentos_recibos','impuesto_descuento_id','recibo_id');
    }

}
