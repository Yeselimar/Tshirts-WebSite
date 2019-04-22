<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DetallesRecibos extends Migration
{
    public function up()
    {
        Schema::create('detalles_recibos', function (Blueprint $table)
        {
            $table->increments('id');

            $table->integer('cantidad');
            $table->float('precio');

            $table->unsignedInteger('articulo_id');
            $table->foreign('articulo_id')->references('id')->on('articulos')->onDelete('cascade');

            $table->unsignedInteger('diseno_id');
            $table->foreign('diseno_id')->references('id')->on('disenos')->onDelete('cascade');

            $table->unsignedInteger('recibo_id');             
            $table->foreign('recibo_id')->references('id')->on('recibos')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('detalles_recibos');
    }
}
