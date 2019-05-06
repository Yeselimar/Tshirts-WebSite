<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Disenos extends Migration
{
    public function up()
    {
        Schema::create('disenos', function (Blueprint $table)
        {
            $table->increments('id');

            $table->float('w');
            $table->float('h');
            $table->float('x');
            $table->float('y');

            $table->unsignedInteger('imagen_articulo_id')->nullable();
            $table->foreign('imagen_articulo_id')->references('id')->on('imagenes_articulos')->onDelete('cascade');

            $table->unsignedInteger('imagen_predisenada_id');
            $table->foreign('imagen_predisenada_id')->references('id')->on('imagenes_predisenadas')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('disenos');
    }
}
