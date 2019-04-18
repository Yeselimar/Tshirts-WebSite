<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class All extends Migration
{
    public function up()
    {
        /*Schema::create('articulos', function (Blueprint $table)
        {
            $table->increments('id');

            $table->string('nombre');
            $table->float('precio');
            $table->integer('cantidad');
            $table->boolean('personalizable')->default(1);
            $table->string('marca');
            $table->text('descripcion');
            $table->float('descuento')->nullable();
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

            $table->timestamps();
        });

        Schema::create('talla_color', function (Blueprint $table)
        {
            $table->increments('id');

            $table->unsignedInteger('color_id');
            $table->foreign('color_id')->references('id')->on('caracteristicas')->onDelete('cascade');//color

            $table->unsignedInteger('tall_id');
            $table->foreign('tall_id')->references('id')->on('caracteristicas')->onDelete('cascade');//talla

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

            $table->enum('posicion', ['frontal']);

            $table->timestamps();
        });

        //categorias para imagenes_diseños
        Schema::create('categorias', function (Blueprint $table)
        {
            $table->increments('id');

            $table->string('nombre');

            $table->timestamps();
        });

        Schema::create('imagenes_disenos', function (Blueprint $table)
        {
            $table->increments('id');

            $table->text('url');

            $table->text('nombre');

            $table->unsignedInteger('categoria_id');
            $table->foreign('categoria_id')->references('id')->on('categorias')->onDelete('cascade');

            $table->unsignedInteger('id_users');
            $table->foreign('id_users')->references('id')->on('users')->onDelete('cascade');

            $table->timestamps();
        });

        Schema::create('disenos', function (Blueprint $table)
        {
            $table->increments('id');

            $table->float('w');
            $table->float('h');
            $table->float('x');
            $table->float('y');

            $table->unsignedInteger('imagen_articulo_id');
            $table->foreign('imagen_articulo_id')->references('id')->on('imagenes_articulos')->onDelete('cascade');

            $table->unsignedInteger('imagen_diseno_id');
            $table->foreign('imagen_diseno_id')->references('id')->on('imagenes_disenos')->onDelete('cascade');

            $table->timestamps();
        });

        Schema::create('recibos', function (Blueprint $table)
        {
            $table->increments('id');

            $table->datetime('fecha');
            $table->time('hora');
            $table->enum('tipo', ['factura','pedido']);
            $table->string('numero_factura')->nullable();
            $table->enum('estatus', ['enviado','aprobado','rechazado','pagado','pago_rechazado']);

            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->timestamps();
        });

        Schema::create('detalles_recibos', function (Blueprint $table)
        {
            $table->increments('id');

            $table->integer('cantidad');
            $table->float('precio');

            $table->unsignedInteger('articulo_id');
            $table->foreign('articulo_id')->references('id')->on('articulos')->onDelete('cascade');

            $table->unsignedInteger('diseno_id');
            $table->foreign('diseno_id')->references('id')->on('disenos')->onDelete('cascade');

            $table->timestamps();
        });
        
        Schema::create('impuestos_descuentos', function (Blueprint $table)
        {
            $table->increments('id');

            $table->string('nombre');
            $table->float('valor');
            $table->boolean('activo')->default(1);
            $table->enum('operacion',['suma','resta']);

            $table->timestamps();
        });

        Schema::create('impuestos_descuentos_recibos', function (Blueprint $table)
        {
            $table->increments('id');

            $table->unsignedInteger('impuestos_descuentos_id');
            $table->foreign('impuestos_descuentos_id')->references('id')->on('impuestos_descuentos')->onDelete('cascade');

            $table->unsignedInteger('recibo_id');
            $table->foreign('recibo_id')->references('id')->on('recibos')->onDelete('cascade');

            $table->timestamps();
        });

        Schema::create('carrito', function (Blueprint $table)
        {
            $table->increments('id');

            $table->integer('cantidad');
            $table->boolean('disponible');
            $table->enum('tipo',['compra','pedido']);

            $table->unsignedInteger('articulo_id');
            $table->foreign('articulo_id')->references('id')->on('articulos')->onDelete('cascade');

            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->timestamps();
        });

        Schema::create('notificacion', function (Blueprint $table)
        {
            $table->increments('id');

            $table->string('asunto');
            $table->text('mensaje');

            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            $table->timestamps();
        });*/
    }

    public function down()
    {
        //
    }
}
