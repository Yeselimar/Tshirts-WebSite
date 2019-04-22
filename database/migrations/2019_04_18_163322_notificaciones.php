<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Notificaciones extends Migration
{
    public function up()
    {
        Schema::create('notificaciones', function (Blueprint $table)
        {
            $table->increments('id');

            $table->string('asunto');
            $table->text('mensaje');

            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->timestamps();
        });
    }

   
    public function down()
    {
        Schema::dropIfExists('notificaciones');
    }
}
