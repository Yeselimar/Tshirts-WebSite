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

            $table->string('nombre');
            $table->float('precio');
            $table->integer('cantidad');
            $table->boolean('personalizable')->default(1);
            $table->string('marca');
            $table->text('descripcion');
            $table->float('descuento')->nullable();
            $table->boolean('destacado')->default(0);

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('articulos');
    }
}
