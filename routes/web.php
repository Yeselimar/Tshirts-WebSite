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


//autentificados
Route::middleware('auth')->post('/add/cart','CartController@addCart')->name('add.cart');
Route::middleware('auth')->post('/add/bag','BagController@addBag')->name('add.bag');

//Login Admin
Route::post('/logout/admin', 'Auth\LoginController@logoutAdmin')->name('logout.admin');
Route::post('/login/admin/auth', 'Auth\LoginController@isLogedAdmin')->name('login.admin.auth');
Route::post('/login/admin/post', 'Auth\LoginController@postloginAdmin')->name('post.admin.login');
//Rubros
Route::post('/rubros/todos','RubrosController@index')->name('rubros.todos');
Route::post('/rubros/todos/api','RubrosController@misrubros')->name('rubros.misrubros');
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

//Imágenes Diseños
Route::post('/imagenes-disenos/todos','ImagenesDisenosController@index')->name('imagenes.disenos.todos');
Route::post('/imagenes-disenos/guardar','ImagenesDisenosController@store')->name('imagenes.disenos.guardar');
Route::post('/imagenes-disenos/{id}/actualizar','ImagenesDisenosController@update')->name('imagenes.disenos.actualizar');
Route::post('/imagenes-disenos/{id}/detalles','ImagenesDisenosController@show')->name('imagenes.disenos.detalles');
Route::post('/imagenes-disenos/{id}/eliminar','ImagenesDisenosController@destroy')->name('imagenes.disenos.eliminar');


//Categorías
Route::post('/categorias/todos','CategoriasController@index')->name('categorias.todos');

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