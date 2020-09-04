<?php

use Illuminate\Support\Facades\Route;

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


Auth::routes();

Route::get('/', 'HomeController@index')->name('home');
Route::get('home', 'HomeController@index')->name('home');
Route::get('/login/customer', 'Auth\LoginController@showCustomerLoginForm');
Route::post('/login/customer', 'Auth\LoginController@customerLogin');
Route::view('/customer', 'customer');
Route::get('/register/customer', 'Auth\RegisterController@showCustomerRegisterForm');
Route::post('/register/customer', 'Auth\RegisterController@createCustomer');



Route::get('auth/facebook', 'Auth\LoginController@redirectToFacebook');
Route::get('callback/facebook', 'Auth\LoginController@handleFacebookCallback'); 
Route::get('auth/google', 'Auth\LoginController@redirectToGoogle');
Route::get('callback/google', 'Auth\LoginController@handleGoogleCallback'); 