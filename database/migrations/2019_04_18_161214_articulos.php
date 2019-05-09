<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Articulos extends Migration
{
    public function up()
    {
        Schema::create('articulos', function (Blueprint $table)
        {
            $table->increments('id');
            $table->enum('tipo', ['ropa','otros'])->default('ropa');//ropa: remera y buzo.
            $table->string('otros')->nullable();// si el tipo es otros se habilita este atributo
            $table->string('nombre');
            $table->string('marca')->nullable();
            $table->text('descripcion');

            $table->enum('tipo_cantidad', ['general','por_variante'])->default('general');
            $table->integer('cantidad');//si el articulo no tiene variates se agrega la suma cantidad de sus variantes
            $table->string('mask_cantidad');
            $table->float('precio_general');//si el articulo no tiene variantes se agrega la cantidad
            $table->string('mask_precio');
            $table->float('descuento')->nullable();

            $table->boolean('personalizable')->default(1);
            $table->boolean('publicado')->default(1);
            $table->boolean('destacado')->default(0);//para destacar el producto

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('articulos');
    }
}
