<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TallaColor extends Migration
{
    public function up()
    {
        Schema::create('talla_color', function (Blueprint $table)
        {
            $table->increments('id');

            $table->unsignedInteger('color_id');
            $table->foreign('color_id')->references('id')->on('caracteristicas')->onDelete('cascade');//color

            $table->unsignedInteger('tall_id');
            $table->foreign('tall_id')->references('id')->on('caracteristicas')->onDelete('cascade');//talla

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('talla_color');
    }
}
