<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TallasColores extends Migration
{
    public function up()
    {
        //para cualquier tipo de artículo
        Schema::create('talles_colores', function (Blueprint $table)
        {
            $table->increments('id');

            $table->unsignedInteger('articulo_id');
            $table->foreign('articulo_id')->references('id')->on('articulos')->onDelete('cascade');//artículo

            $table->unsignedInteger('color_id');
            $table->foreign('color_id')->references('id')->on('caracteristicas')->onDelete('cascade');//característica del grupo color

            $table->unsignedInteger('talla_id')->nullable(); //es opcional en caso de que  el tipo sea una taza
            $table->foreign('talla_id')->references('id')->on('caracteristicas')->onDelete('cascade');//característica del grupo talla

            $table->integer('cantidad');//cantidad de una combinación: talla y color 
            
            $table->float('precio');
            
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('talles_colores');
    }
}
