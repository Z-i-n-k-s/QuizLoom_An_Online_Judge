<?php

namespace App\Http\Controllers;

use App\Services\CourseService;
use Illuminate\Http\Request;

class CourseController extends Controller {
    protected $courseService;

    public function __construct(CourseService $courseService) {
        $this->courseService = $courseService;
    }

    public function index() {
        return response()->json($this->courseService->getAllCourses());
    }

    public function show($id) {
        return response()->json($this->courseService->getCourseById($id));
    }

    public function store(Request $request) {
        $data = $request->validate([
            'teacher_id' => 'required|exists:teachers,id',
            'course_code' => 'required|unique:courses,course_code',
            'name' => 'required|string',
            'completion_time' => 'required|integer',
            'number_of_lectures' => 'required|integer',
        ]);
        return response()->json($this->courseService->createCourse($data));
    }

    public function update(Request $request, $id) {
        $data = $request->validate([
            'teacher_id' => 'sometimes|exists:teachers,id',
            'course_code' => 'sometimes|unique:courses,course_code,'.$id,
            'name' => 'sometimes|string',
            'completion_time' => 'sometimes|integer',
            'number_of_lectures' => 'sometimes|integer',
        ]);
        return response()->json($this->courseService->updateCourse($id, $data));
    }

    public function destroy($id) {
        return response()->json(['deleted' => $this->courseService->deleteCourse($id)]);
    }
}
