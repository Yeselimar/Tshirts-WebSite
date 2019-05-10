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

            $table->float('top');
            $table->float('left');
            $table->float('width');
            $table->float('height');
            $table->float('w_content_admin');
            $table->float('h_content_admin');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('coordenadas');
    }
}
