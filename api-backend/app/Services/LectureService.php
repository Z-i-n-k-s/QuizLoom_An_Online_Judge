<?php

namespace App\Services;

use App\Models\Lecture;
use App\Models\Course;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class LectureService {

    public function getLecturesByCourseId($courseId)
    {
        $course = Course::with([
            'lectures.exam.quizQuestions',
            'lectures.exam.results',
            'lectures.exam.codeExamQuestions', // Include CodeExamQuestion
        ])->findOrFail($courseId);
    
        return $course->lectures;
    }
    
    

    public function getLectureById($id) {
        return Lecture::findOrFail($id);
    }

    public function createLecture($courseId, $data) {
        $course = Course::findOrFail($courseId);
        return $course->lectures()->create($data);
    }

    public function updateLecture($lectureId, $data) {
        $lecture = Lecture::findOrFail($lectureId);
        $lecture->update($data);
        return $lecture;
    }

    public function deleteLecture($lectureId) {
        $lecture = Lecture::findOrFail($lectureId);
        return $lecture->delete();
    }
}
