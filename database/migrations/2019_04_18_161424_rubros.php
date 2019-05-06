<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Rubros extends Migration
{
    public function up()
    {
        Schema::create('rubros', function (Blueprint $table)
        {
            $table->increments('id');

            $table->string('nombre');
            $table->boolean('principal')->default(0);//si es visible en la barra del menú principal

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('rubros');
    }
}
