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
Route::get('/disenar','FrontController@disenarproducto')->name('disenar');
Route::get('/register','FrontController@register')->name('register');
Route::post('/register/post','RegistroBarnaController@registerPost')->name('registerPost');
Route::post('/login/post', 'Auth\LoginController@postlogin')->name('post.login');
Route::get('/logout', 'Auth\LoginController@logout')->name('logout');
Route::get('/login/auth', 'Auth\LoginController@isLoged')->name('login.auth');


//Auth::routes();
//Route::get('/home', 'HomeController@index')->name('home');