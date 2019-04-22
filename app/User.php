<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name','last_name', 'email', 'phone', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function recibos()
    {
        return $this->hasMany('App\Recibo','user_id');
    }

    public function notificaciones()
    {
        return $this->hasMany('App\Notificacion','user_id');
    }

    public function carritos()
    {
        return $this->hasMany('App\Carrito','user_id');
    }
}
