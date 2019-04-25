<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Grupos extends Migration
{
    public function up()
    {
        Schema::create('grupos', function (Blueprint $table)
        {
            $table->increments('id');

            $table->string('nombre');
            $table->boolean('color');

            $table->timestamps();
        });
    }

    
    public function down()
    {
        Schema::dropIfExists('grupos');
    }
}
