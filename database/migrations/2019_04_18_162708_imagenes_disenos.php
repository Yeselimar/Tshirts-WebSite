<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ImagenesDisenos extends Migration
{
    public function up()
    {
        Schema::create('imagenes_predisenadas', function (Blueprint $table)//Aquí tambien se gaurdan las imágenes de los diseños que suben los usuarios
        {
            $table->increments('id');

            $table->text('url');

            $table->text('nombre');

            $table->unsignedInteger('categoria_id')->nullable();
            $table->foreign('categoria_id')->references('id')->on('categorias')->onDelete('cascade');

            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('imagenes_predisenadas');
    }
}
