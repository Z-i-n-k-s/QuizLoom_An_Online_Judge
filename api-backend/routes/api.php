<?php

use App\Http\Controllers\RegisterController;
use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//Route::get('/test', [TestController::class, 'getTestHuman']);
Route::get('/test/{id}', [TestController::class, 'getTestHumanWithId']);
Route::get('/test', [TestController::class, 'getTestHuman'])->middleware('test.middleware');

Route::post('/register', [RegisterController::class, 'register']);