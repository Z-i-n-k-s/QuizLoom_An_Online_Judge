<?php

namespace App\Services;

use App\Models\Course;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CourseService {

    public function getAllCourses() {
        // Returns all courses with their lectures.
        return Course::with('lectures')->get();
    }

    public function getCourseById($id) {
        return Course::with('lectures')->findOrFail($id);
    }

    public function createCourse($data) {
        return Course::create($data);
    }

    public function updateCourse($id, $data) {
        $course = Course::findOrFail($id);
        $course->update($data);
        return $course;
    }

    public function deleteCourse($id) {
        $course = Course::findOrFail($id);
        return $course->delete();
    }
}
