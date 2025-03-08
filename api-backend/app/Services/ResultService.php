<?php

namespace App\Services;

use App\Models\Exam;
use App\Models\Result;
use App\Models\Student;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ResultService {

    public function getAllResults() {
        return Result::with('student', 'exam')->get();
    }

    public function getResultById($id) {
        return Result::with('student', 'exam')->findOrFail($id);
    }

    public function createResult($data) {
        // Check if the student exists
        $student = Student::find($data['student_id']);
        if (!$student) {
            throw new \Exception("Student not found.");
        }
    
        // Check if the exam exists
        $exam = Exam::find($data['exam_id']);
        if (!$exam) {
            throw new \Exception("Exam not found.");
        }
    
        // Optionally, check if this student already has a result for this exam
        // to avoid duplicate entries:
        $result = Result::firstOrNew([
             'student_id' => $data['student_id'],
             'exam_id' => $data['exam_id']
        ]);
    
        $result->obtained_marks = $data['obtained_marks'];
        $result->status = $data['status'];
        $result->save();
    
        return $result;
    }
    

    public function updateResult($id, $data) {
        $result = Result::findOrFail($id);
        $result->update($data);
        return $result;
    }

    public function deleteResult($id) {
        $result = Result::findOrFail($id);
        return $result->delete();
    }
}
