<?php

namespace App\Services;

use App\Models\Course;
use App\Models\Lecture;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CourseService {
    
    public function getAllCourses() {
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

    public function addLecture($courseId, $lectureData) {
        $course = Course::findOrFail($courseId);
        return $course->lectures()->create($lectureData);
    }

    public function updateLecture($lectureId, $lectureData) {
        $lecture = Lecture::findOrFail($lectureId);
        $lecture->update($lectureData);
        return $lecture;
    }

    public function deleteLecture($lectureId) {
        $lecture = Lecture::findOrFail($lectureId);
        return $lecture->delete();
    }
}
