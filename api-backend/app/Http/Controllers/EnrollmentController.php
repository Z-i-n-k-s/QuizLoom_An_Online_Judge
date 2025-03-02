<?php

namespace App\Http\Controllers;

use App\Services\EnrollmentService;
use Illuminate\Http\Request;

class EnrollmentController extends Controller {
    protected $enrollmentService;

    public function __construct(EnrollmentService $enrollmentService) {
        $this->enrollmentService = $enrollmentService;
    }

    public function index() {
        // Optionally, list all enrollments or filter by student/teacher.
        return response()->json($this->enrollmentService->getAllEnrollments());
    }

    public function show($id) {
        return response()->json($this->enrollmentService->getEnrollmentById($id));
    }

    public function store(Request $request) {
        $data = $request->validate([
            'student_id' => 'required|exists:students,id',
            'course_id' => 'required|exists:courses,id',
        ]);
        return response()->json($this->enrollmentService->createEnrollment($data));
    }

    public function destroy($id) {
        return response()->json(['deleted' => $this->enrollmentService->deleteEnrollment($id)]);
    }

    /**
     * Feature: Get all courses a student is enrolled in.
     *
     * @param int $studentId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getEnrolledCoursesForStudent($studentId) {
        return response()->json($this->enrollmentService->getCoursesForStudent($studentId));
    }

    /**
     * Feature: For a teacher, get the details of all students enrolled in a specific course.
     * (In a real application, you would verify the teacher's ownership of the course.)
     *
     * @param int $courseId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getEnrolledStudentsForCourse($courseId) {
        return response()->json($this->enrollmentService->getStudentsForCourse($courseId));
    }

    /**
     * Feature: Enroll a student in a course using the course code.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $studentId
     * @return \Illuminate\Http\JsonResponse
     */
    public function enrollByCourseCode(Request $request, $studentId) {
        $data = $request->validate([
            'course_code' => 'required|string'
        ]);
        return response()->json($this->enrollmentService->enrollByCourseCode($studentId, $data['course_code']));
    }
}
