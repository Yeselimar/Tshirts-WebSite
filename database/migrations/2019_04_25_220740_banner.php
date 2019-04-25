<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Banner extends Migration
{
    public function up()
    {
        Schema::create('banner', function (Blueprint $table)
        {
            $table->increments('id');

            $table->string('imagen');
            $table->text('descripcion');

            $table->unsignedInteger('articulo_id');
            $table->foreign('articulo_id')->references('id')->on('articulos')->onDelete('cascade');
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('banner');
    }
}
