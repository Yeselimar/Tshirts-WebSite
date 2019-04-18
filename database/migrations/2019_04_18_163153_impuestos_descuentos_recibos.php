<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ImpuestosDescuentosRecibos extends Migration
{
    public function up()
    {
        Schema::create('impuestos_descuentos_recibos', function (Blueprint $table)
        {
            $table->increments('id');

            $table->unsignedInteger('impuestos_descuentos_id');
            $table->foreign('impuestos_descuentos_id')->references('id')->on('impuestos_descuentos')->onDelete('cascade');

            $table->unsignedInteger('recibo_id');
            $table->foreign('recibo_id')->references('id')->on('recibos')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('impuestos_descuentos_recibos');
    }
}
