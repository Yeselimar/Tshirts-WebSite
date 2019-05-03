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
            $table->string('marca');
            $table->text('descripcion');

            //$table->boolean('')->default(0);//es variante
            $table->integer('cantidad');//si el articulo no tiene variates se agrega la cantidad
            $table->float('precio_general');//si el articulo no tiene variantes se agrega la cantidad
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
