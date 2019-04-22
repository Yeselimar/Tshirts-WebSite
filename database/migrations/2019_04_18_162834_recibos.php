<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Recibos extends Migration
{
    public function up()
    {
        Schema::create('recibos', function (Blueprint $table)
        {
            $table->increments('id');

            $table->datetime('fecha');
            $table->time('hora');
            $table->enum('tipo', ['factura','pedido']);
            $table->string('numero_factura')->nullable();
            $table->enum('estatus', ['enviado','aprobado','rechazado','pagado','pago_rechazado']);

            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->timestamps();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('recibos');
    }
}
