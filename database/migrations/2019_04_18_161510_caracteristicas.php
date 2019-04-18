<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Caracteristicas extends Migration
{
    public function up()
    {
        Schema::create('caracteristicas', function (Blueprint $table)
        {
            $table->increments('id');

            $table->string('valor');
            $table->string('color')->nullable();

            $table->unsignedInteger('grupo_id');
            $table->foreign('grupo_id')->references('id')->on('grupos')->onDelete('cascade');

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('caracteristicas');
    }
}
