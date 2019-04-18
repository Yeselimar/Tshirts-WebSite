<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetalleRecibo extends Model
{
    protected $table = 'detalles_recibos';

    public function recibo()
    {
        return $this->belongsTo('App\Recibo','recibo_id');
    }

    public function diseno()
    {
        return $this->belongsTo('App\Diseno','diseno_id');
    }

    public function articulo()
    {
        return $this->belongsTo('App\Articulo','articulo_id');
    }

}
