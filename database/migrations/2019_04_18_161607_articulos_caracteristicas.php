<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ArticulosCaracteristicas extends Migration
{
    public function up()
    {
        Schema::create('articulos_caracteristicas', function (Blueprint $table)
        {
            $table->increments('id');

            $table->unsignedInteger('articulo_id');
            $table->foreign('articulo_id')->references('id')->on('articulos')->onDelete('cascade');

            $table->unsignedInteger('caracteristica_id');
            $table->foreign('caracteristica_id')->references('id')->on('caracteristicas')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('articulos_caracteristicas');
    }
}
