<?php


use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CodeExamQuestionController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\LectureController;
use App\Http\Controllers\LectureQuestionController;
use App\Http\Controllers\QuizQuestionController;
use App\Http\Controllers\ResultController;

use App\Http\Controllers\UserController;
use App\Http\Middleware\TokenMiddleware;
use Illuminate\Support\Facades\Route;

// ---------------------
// Auth Routes
// ---------------------
Route::post('/register', [AuthController::class, 'register']);
Route::get('/token/refresh', [AuthController::class, 'refreshToken']);

Route::post('/login', [AuthController::class, 'login']);// Limit to 5 attempts per minute

Route::post('/logout', [AuthController::class, 'logout']) ->middleware(TokenMiddleware::class);

// ---------------------
// User Routes
// ---------------------

 // This route returns the profile (full details) of the authenticated user
 Route::get('/users/profile', [UserController::class, 'profile'])
 ->middleware(TokenMiddleware::class);



 // This route allows an admin to see all users with limited details
 Route::get('/users', [UserController::class, 'index']);

 // Additional routes
 Route::post('/users', [UserController::class, 'store']); // Create a new user (Admin only)
 Route::get('/users/{id}', [UserController::class, 'show']); // Get a specific user's details (Admin only)
 Route::put('/users/{id}', [UserController::class, 'update']); // Update user info (Admin & user can update their own)
 Route::delete('/users/{id}', [UserController::class, 'destroy']); // Delete a user (Admin only)



// ---------------------
// Courses Routes
// ---------------------
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{id}', [CourseController::class, 'show']);
Route::post('/courses', [CourseController::class, 'store']);
Route::put('/courses/{id}', [CourseController::class, 'update']);
Route::delete('/courses/{id}', [CourseController::class, 'destroy']);

Route::get('teachers/{teacherId}/courses', [CourseController::class, 'getCoursesByTeacher']);

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
Route::get('teachers/{teacherId}/announcements', [AnnouncementController::class, 'getAnnouncementsByTeacher']);
Route::get('/students/{studentId}/announcements', [AnnouncementController::class, 'getAnnouncementsForStudent']);
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

// ---------------------
// lecture Qustions Routes
// ---------------------

Route::prefix('lecture-questions')->group(function () {
    Route::get('/', [LectureQuestionController::class, 'index']);
    Route::get('/{id}/questions-answers', [LectureQuestionController::class, 'getQuestionsWithAnswers']);
    Route::post('/', [LectureQuestionController::class, 'store']);
    Route::get('/{id}', [LectureQuestionController::class, 'show']);
    Route::put('/{id}', [LectureQuestionController::class, 'update']);
    Route::delete('/{id}', [LectureQuestionController::class, 'destroy']);
    Route::post('/answer', [LectureQuestionController::class, 'storeAnswer']);
});


// ---------------------
// code Qustions Routes
// ---------------------


Route::prefix('code-exam-questions')->group(function () {
    Route::get('/', [CodeExamQuestionController::class, 'index']); // Get all code exam questions
    Route::post('/', [CodeExamQuestionController::class, 'store']); // Create a new code exam question
    Route::post('/ansCode', [CodeExamQuestionController::class, 'storeAnsOfCode']); // Create a new code exam question
    Route::get('/allAnsCode', [CodeExamQuestionController::class, 'getAllSubmissions']);

    Route::get('/{id}', [CodeExamQuestionController::class, 'show']); // Get a specific code exam question
    Route::put('/{id}', [CodeExamQuestionController::class, 'update']); // Update a code exam question
    Route::delete('/{id}', [CodeExamQuestionController::class, 'destroy']); // Delete a code exam question
});