<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\TestQueryController;

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

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1'); // Limit to 5 attempts per minute

Route::get('/logout', [AuthController::class, 'logout']);

Route::get('/test-reports', [TestQueryController::class, 'index']);

Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{id}', [CourseController::class, 'show']);
Route::post('/courses', [CourseController::class, 'store']);
Route::put('/courses/{id}', [CourseController::class, 'update']);
Route::delete('/courses/{id}', [CourseController::class, 'destroy']);

Route::post('/courses/{courseId}/lectures', [CourseController::class, 'addLecture']);
Route::put('/lectures/{lectureId}', [CourseController::class, 'updateLecture']);
Route::delete('/lectures/{lectureId}', [CourseController::class, 'deleteLecture']);