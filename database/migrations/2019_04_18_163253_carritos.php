<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Carritos extends Migration
{
    public function up()
    {
        Schema::create('carritos', function (Blueprint $table)
        {
            $table->increments('id');

            $table->integer('cantidad');
            $table->float('precio');
            $table->boolean('disponible');
            $table->enum('tipo',['compra','pedido']);

            $table->unsignedInteger('color_id');//color
            $table->foreign('color_id')->references('id')->on('caracteristicas')->onDelete('cascade');

            $table->unsignedInteger('talle_id')->nullable();//talle
            $table->foreign('talle_id')->references('id')->on('caracteristicas')->onDelete('cascade');

            //¿qué pasa si el artículo tiene muchas característica? Es decir además de talle y color

            $table->unsignedInteger('articulo_id');
            $table->foreign('articulo_id')->references('id')->on('articulos')->onDelete('cascade');

            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('carritos');
    }
}
