<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Coordenadas extends Migration
{
    public function up()
    {
        Schema::create('coordenadas', function (Blueprint $table)
        {
            $table->increments('id');

            $table->float('w');
            $table->float('h');
            $table->float('x');
            $table->float('y');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('coordenadas');
    }
}
