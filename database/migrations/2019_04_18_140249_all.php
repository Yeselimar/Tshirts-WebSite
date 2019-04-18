<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class All extends Migration
{
    public function up()
    {
        Schema::create('articulos', function (Blueprint $table)
        {
            $table->increments('id');
            $table->string('nombre');
            $table->float('precio');
            $table->integer('stock');
            $table->boolean('personalizable')->default(1);
            $table->string('marca');
            $table->text('descripcion');
            $table->boolean('destacado')->default(0);

            $table->timestamps();
        });

        Schema::create('grupos', function (Blueprint $table)
        {
            $table->increments('id');
            $table->string('nombre');

            $table->timestamps();
        });

        Schema::create('rubros', function (Blueprint $table)
        {
            $table->increments('id');
            $table->string('nombre');
            $table->boolean('principal')->default(0);

            $table->timestamps();
        });

        Schema::create('caracteristicas', function (Blueprint $table)
        {
            $table->increments('id');
            $table->string('valor');
            $table->string('color')->nullable();

            $table->unsignedInteger('grupo_id');
            $table->foreign('grupo_id')->references('id')->on('grupos')->onDelete('cascade');

            $table->timestamps();
        });

        Schema::create('articulos_caracteristicas', function (Blueprint $table)
        {
            $table->increments('id');

            $table->unsignedInteger('articulo_id');
            $table->foreign('articulo_id')->references('id')->on('articulos')->onDelete('cascade');

            $table->unsignedInteger('caracteristica_id');
            $table->foreign('caracteristica_id')->references('id')->on('caracteristicas')->onDelete('cascade');

            $table->timestamps();

        });
        

        Schema::create('articulos_rubros', function (Blueprint $table)
        {
            $table->increments('id');

            $table->unsignedInteger('articulo_id');
            $table->foreign('articulo_id')->references('id')->on('articulos')->onDelete('cascade');

            $table->unsignedInteger('rubro_id');
            $table->foreign('rubro_id')->references('id')->on('rubros')->onDelete('cascade');
        });
        Schema::create('talla_color', function (Blueprint $table)
        {
            $table->increments('id');

            $table->unsignedInteger('caracteristica_id');
            $table->foreign('caracteristica_id')->references('id')->on('caracteristicas')->onDelete('cascade');

            $table->unsignedInteger('caracteristica_id');
            $table->foreign('caracteristica_id')->references('id')->on('caracteristicas')->onDelete('cascade');

            $table->timestamps();
        });

        Schema::create('coordenadas', function (Blueprint $table)
        {
            $table->increments('id');
            $table->float('w');
            $table->float('h');
            $table->float('x');
            $table->float('y');

            $table->timestamps();
        });

        Schema::create('imagenes_articulos', function (Blueprint $table)
        {
            $table->increments('id');
            $table->text('url');

            $table->unsignedInteger('articulo_id');
            $table->foreign('articulo_id')->references('id')->on('articulos')->onDelete('cascade');

            $table->unsignedInteger('coordenada_id');
            $table->foreign('coordenada_id')->references('id')->on('coordenadas')->onDelete('cascade');

            $table->unsignedInteger('caracteristica_id');
            $table->foreign('caracteristica_id')->references('id')->on('caracteristicas')->onDelete('cascade');

            $table->unsignedInteger('caracteristica_id');
            $table->foreign('caracteristica_id')->references('id')->on('caracteristicas')->onDelete('cascade');

        });
       

    }

    public function down()
    {
        //
    }
}
