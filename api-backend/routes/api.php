<?php

use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\LectureController;
use App\Http\Controllers\QuizQuestionController;
use App\Http\Controllers\ResultController;
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
// Route::get('/test', [TestController::class, 'getTestHuman'])->middleware('test.middleware');
// Route::get('/test/{id}', [TestController::class, 'getTestHumanWithId']);
//Route::post('/login', [AuthController::class, 'login']);

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);// Limit to 5 attempts per minute

Route::get('/logout', [AuthController::class, 'logout']);


// ---------------------
// Courses Routes
// ---------------------
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{id}', [CourseController::class, 'show']);
Route::post('/courses', [CourseController::class, 'store']);
Route::put('/courses/{id}', [CourseController::class, 'update']);
Route::delete('/courses/{id}', [CourseController::class, 'destroy']);

// ---------------------
// Lectures Routes
// ---------------------
Route::get('/courses/{courseId}/lectures', [LectureController::class, 'index']);
Route::get('/lectures/{id}', [LectureController::class, 'show']);
Route::post('/courses/{courseId}/lectures', [LectureController::class, 'store']);
Route::put('/lectures/{id}', [LectureController::class, 'update']);
Route::delete('/lectures/{id}', [LectureController::class, 'destroy']);

// ---------------------
// Exams Routes
// ---------------------
Route::get('/exams', [ExamController::class, 'index']);
Route::get('/exams/{id}', [ExamController::class, 'show']);
Route::post('/exams', [ExamController::class, 'store']);
Route::put('/exams/{id}', [ExamController::class, 'update']);
Route::delete('/exams/{id}', [ExamController::class, 'destroy']);

// Additional endpoint: Students view upcoming exams
Route::get('/students/{studentId}/exams/upcoming', [ExamController::class, 'upcomingExamsForStudent']);

// ---------------------
// Quiz Questions Routes
// ---------------------
Route::get('/exams/{examId}/questions', [QuizQuestionController::class, 'index']);
Route::get('/questions/{id}', [QuizQuestionController::class, 'show']);
Route::post('/exams/{examId}/questions', [QuizQuestionController::class, 'store']);
Route::put('/questions/{id}', [QuizQuestionController::class, 'update']);
Route::delete('/questions/{id}', [QuizQuestionController::class, 'destroy']);

// ---------------------
// Announcements Routes
// ---------------------
Route::get('/courses/{courseId}/announcements', [AnnouncementController::class, 'index']);
Route::get('/announcements/{id}', [AnnouncementController::class, 'show']);
Route::post('/courses/{courseId}/announcements', [AnnouncementController::class, 'store']);
Route::put('/announcements/{id}', [AnnouncementController::class, 'update']);
Route::delete('/announcements/{id}', [AnnouncementController::class, 'destroy']);

// ---------------------
// Enrollments Routes
// ---------------------
Route::get('/enrollments', [EnrollmentController::class, 'index']);
Route::get('/enrollments/{id}', [EnrollmentController::class, 'show']);
Route::post('/enrollments', [EnrollmentController::class, 'store']);
Route::delete('/enrollments/{id}', [EnrollmentController::class, 'destroy']);

// Additional endpoints for enrollment features:
// 1. List all courses a student is enrolled in.
Route::get('/students/{studentId}/courses', [EnrollmentController::class, 'getEnrolledCoursesForStudent']);

// 2. For a teacher: List all students enrolled in a specific course.
Route::get('/courses/{courseId}/students', [EnrollmentController::class, 'getEnrolledStudentsForCourse']);

// 3. Enroll a student in a course using the course code.
Route::post('/students/{studentId}/enroll', [EnrollmentController::class, 'enrollByCourseCode']);

// ---------------------
// Results Routes
// ---------------------
Route::get('/results', [ResultController::class, 'index']);
Route::get('/results/{id}', [ResultController::class, 'show']);
Route::post('/results', [ResultController::class, 'store']);
Route::put('/results/{id}', [ResultController::class, 'update']);
Route::delete('/results/{id}', [ResultController::class, 'destroy']);