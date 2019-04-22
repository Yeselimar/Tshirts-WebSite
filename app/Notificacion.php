<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notificacion extends Model
{
    protected $table = 'notificaciones';

    public function usuario()
    {
        return $this->belongsTo('App\User','user_id');
    }
}
