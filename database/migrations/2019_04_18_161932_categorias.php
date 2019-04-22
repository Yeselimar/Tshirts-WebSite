<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Categorias extends Migration
{
    public function up()
    {
        //categorias para imagenes_diseños
        Schema::create('categorias', function (Blueprint $table)
        {
            $table->increments('id');

            $table->string('nombre');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('categorias');
    }
}
