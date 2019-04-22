<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ImpuestosDescuentos extends Migration
{
    public function up()
    {
        Schema::create('impuestos_descuentos', function (Blueprint $table)
        {
            $table->increments('id');

            $table->string('nombre');
            $table->float('valor');
            $table->boolean('activo')->default(1);
            $table->enum('operacion',['suma','resta']);

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('impuestos_descuentos');
    }
}
