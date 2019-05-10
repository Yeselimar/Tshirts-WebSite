<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::get('/', function () {
    return view('index');
});
*/

Route::post('/recibirpago', 'MPagoController@respuestaMP')->name('respuesta.mp');

Route::get('/admin/{vue_capture?}', function () {
    return view('back.index');
})->where('vue_capture', '[\/\w\.-]*');
Route::get('/login/{vue_capture?}', function () {
    return view('back.index');
})->where('vue_capture', '[\/\w\.-]*');
Route::get('/{vue_capture?}', function () {
    return view('vue.index');
})->where('vue_capture', '[\/\w\.-]*');


//Login User
Route::post('/register/post','RegistroBarnaController@registerPost')->name('registerPost');
Route::post('/login/post', 'Auth\LoginController@postlogin')->name('post.login');
Route::post('/logout', 'Auth\LoginController@logout')->name('logout');
Route::post('/login/auth', 'Auth\LoginController@isLoged')->name('login.auth');

//Autentificados
Route::middleware('auth')->post('/add/cart','CartController@addCart')->name('add.cart');
Route::middleware('auth')->post('/add/bag','BagController@addBag')->name('add.bag');

//Login Admin
Route::post('/logout/admin', 'Auth\LoginController@logoutAdmin')->name('logout.admin');
Route::post('/login/admin/auth', 'Auth\LoginController@isLogedAdmin')->name('login.admin.auth');
Route::post('/login/admin/post', 'Auth\LoginController@postloginAdmin')->name('post.admin.login');

//Rubros
Route::post('/rubros/todos','RubrosController@index')->name('rubros.todos');
Route::post('/rubros/todos/api','RubrosController@misrubros')->name('rubros.misrubros');
Route::post('/rubros/todos/favoritos','RubrosController@todosfavoritos')->name('rubros.favoritos');
Route::post('/rubros/guardar','RubrosController@store')->name('rubros.guardar');
Route::post('/rubros/{id}/actualizar','RubrosController@update')->name('rubros.actualizar');
Route::post('/rubros/{id}/eliminar','RubrosController@destroy')->name('rubros.eliminar');
Route::post('/rubros/{id}/detalles','RubrosController@show')->name('rubros.detalles');

//Grupos
Route::post('/grupos/todos','GruposController@index')->name('grupos.todos');
Route::post('/grupos/guardar','GruposController@store')->name('grupos.guardar');
Route::post('/grupos/{id}/actualizar','GruposController@update')->name('grupos.actualizar');
Route::post('/grupos/{id}/eliminar','GruposController@destroy')->name('grupos.eliminar');
Route::post('/grupos/{id}/detalles','GruposController@show')->name('grupos.detalles');
Route::post('/grupos/colores/api','GruposController@colores')->name('grupos.colores');
Route::post('/grupos/talles/api','GruposController@talles')->name('grupos.talles');

//Caracteristicas
Route::post('/caracteristicas/todos','CaracteristicasController@index')->name('caracteristicas.todos');
Route::post('/grupo/{grupo_id}/caracteristicas','CaracteristicasController@caracteristicaporgrupo')->name('caracteristicas.porgrupo');
Route::post('/caracteristicas/guardar','CaracteristicasController@store')->name('caracteristicas.guardar');
Route::post('/caracteristicas/{id}/actualizar','CaracteristicasController@update')->name('caracteristicas.actualizar');
Route::post('/caracteristicas/{id}/eliminar','CaracteristicasController@destroy')->name('caracteristicas.eliminar');
Route::post('/caracteristicas/{id}/detalles','CaracteristicasController@show')->name('caracteristicas.detalles');

//Artículos
Route::post('/articulos/todos','ArticulosController@index')->name('articulos.todos');
Route::post('/articulos/disenables/todos','ArticulosController@getarticulosdisenables')->name('articulos.disenables.todos');
Route::post('/articulos/disenables/todos/api','ArticulosController@disenables')->name('articulos.disenables.todos.api');//Creado por Rafael
Route::post('/articulos/no-disenables/todos/api','ArticulosController@nodisenables')->name('articulos.nodisenables.todos.api');//Creado por Rafael
Route::post('/articulos/destacados/todos','ArticulosController@todosdestacados')->name('articulos.destacados.todos');
Route::post('/articulos/todos/para-banner','ArticulosController@todosparabanner')->name('articulos.todos.para.banner');
Route::post('/articulo/no-disenable/guardar','ArticulosController@storenodisenable')->name('articulo.guardar.nodisenable');
Route::post('/articulo/disenable/guardar','ArticulosController@storedisenable')->name('articulo.guardar.disenable');
Route::post('/articulo/no-disenable/{id}/editar','ArticulosController@editnodisenable')->name('articulo.editar.nodisenable');
Route::post('/articulo/{id}/detalles','ArticulosController@show')->name('articulo.detalles');
Route::post('/articulo/{id}/no-disenable/actualizar','ArticulosController@updatenodisenable')->name('articulo.actualizar.nodisenable');
Route::post('/articulo/{id}/disenable/actualizar','ArticulosController@updatedisenable')->name('articulo.actualizar.disenable');
Route::post('/articulo/{id}/eliminar','ArticulosController@destroy')->name('articulo.eliminar');


//Imagenes Artículos
Route::post('/imagenes-articulos/posicion-imagen','ImagenesArticulosController@posicionimagen')->name('imagenes.articulos.posicion.imagen');


//Imágenes Prediseñadas
Route::post('/imagenes-predisenadas/todos','ImagenesPredisenadasController@index')->name('imagenes.disenos.todos');
Route::post('/imagenes-predisenadas/tipo/administrador','ImagenesPredisenadasController@deadministrador')->name('imagenes.disenos.de.administrador');
Route::post('/imagenes-predisenadas/tipo/cliente','ImagenesPredisenadasController@decliente')->name('imagenes.disenos.de.cliente');
Route::post('/imagenes-predisenadas/guardar','ImagenesPredisenadasController@store')->name('imagenes.disenos.guardar');
Route::post('/imagenes-predisenadas/{id}/actualizar','ImagenesPredisenadasController@update')->name('imagenes.disenos.actualizar');
Route::post('/imagenes-predisenadas/{id}/detalles','ImagenesPredisenadasController@show')->name('imagenes.disenos.detalles');
Route::post('/imagenes-predisenadas/{id}/eliminar','ImagenesPredisenadasController@destroy')->name('imagenes.disenos.eliminar');


//Categorías
Route::post('/categorias/todos','CategoriasController@index')->name('categorias.todos');

//Banner
Route::post('/banner/todos','BannerController@index')->name('banner.todos');
Route::post('/banner/todos/disenables','BannerController@todosdisenables')->name('banner.todos.disenables');
Route::post('/banner/todos/no-disenables','BannerController@todosnodisenables')->name('banner.todos.nodisenables');
Route::post('/banner/guardar','BannerController@store')->name('banner.guardar');
Route::post('/banner/{id}/actualizar','BannerController@update')->name('banner.actualizar');
Route::post('/banner/{id}/detalles','BannerController@show')->name('banner.detalles');
Route::post('/banner/{id}/eliminar','BannerController@destroy')->name('banner.eliminar');

Route::post('/pagar','MPagoController@pagar')->name('pagar');
//Prueba
Route::post('/front/prueba','FrontController@prueba')->name('front.prueba');
//comente esto por el vue-router
/*Route::get('/','FrontController@index')->name('inicio');
Route::get('/rubros','FrontController@rubros')->name('rubros');
Route::get('/procesar-carrito','FrontController@procesarcarrito')->name('procesar.carrito');
Route::get('/pedido-generado','FrontController@pedidogenerado')->name('pedido.generado');
Route::get('/disenar','FrontController@disenarproducto')->name('disenar');
Route::get('/comprar','FrontController@comprarproducto')->name('comprar');

Route::get('/register','FrontController@register')->name('register');
Route::post('/register/post','RegistroBarnaController@registerPost')->name('registerPost');
Route::post('/login/post', 'Auth\LoginController@postlogin')->name('post.login');
Route::get('/logout', 'Auth\LoginController@logout')->name('logout');
Route::get('/login/auth', 'Auth\LoginController@isLoged')->name('login.auth');
*/

//Auth::routes();
//Route::get('/home', 'HomeController@index')->name('home');