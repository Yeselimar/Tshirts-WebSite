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
Route::get('/','FrontController@index')->name('inicio');
Route::get('/rubros','FrontController@rubros')->name('rubros');
Route::get('/procesar-carrito','FrontController@procesarcarrito')->name('procesar.carrito');
Route::get('/pedido-generado','FrontController@pedidogenerado')->name('pedido.generado');

