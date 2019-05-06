<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ImagenesArticulos extends Migration
{
    public function up()
    {
        Schema::create('imagenes_articulos', function (Blueprint $table)
        {
            $table->increments('id');

            $table->text('url');

            $table->unsignedInteger('articulo_id');
            $table->foreign('articulo_id')->references('id')->on('articulos')->onDelete('cascade');

            $table->unsignedInteger('coordenada_id')->nullable();//puede ser nulable
            $table->foreign('coordenada_id')->references('id')->on('coordenadas')->onDelete('cascade');

            $table->unsignedInteger('caracteristica_id')->nullable();//puede ser nulable 
            $table->foreign('caracteristica_id')->references('id')->on('caracteristicas')->onDelete('cascade');//color

            $table->enum('posicion', ['frontal','reverso'])->default('frontal');

            $table->boolean('principal')->default(0);

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('imagenes_articulos');
    }
}
