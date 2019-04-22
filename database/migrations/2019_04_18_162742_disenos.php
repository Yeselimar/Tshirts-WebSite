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

            $table->unsignedInteger('imagen_articulo_id');
            $table->foreign('imagen_articulo_id')->references('id')->on('imagenes_articulos')->onDelete('cascade');

            $table->unsignedInteger('imagen_diseno_id');
            $table->foreign('imagen_diseno_id')->references('id')->on('imagenes_disenos')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('disenos');
    }
}
