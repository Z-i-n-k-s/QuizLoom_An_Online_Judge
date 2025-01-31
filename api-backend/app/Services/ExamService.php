<?php
namespace App\Services;

use App\Models\Exam;
use App\Models\QuizQuestion;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ExamService {
    
    public function getAllExams() {
        return Exam::with('course', 'questions')->get();
    }

    public function getExamById($id) {
        return Exam::with('course', 'questions')->findOrFail($id);
    }

    public function createExam($data) {
        return Exam::create($data);
    }

    public function updateExam($id, $data) {
        $exam = Exam::findOrFail($id);
        $exam->update($data);
        return $exam;
    }

    public function deleteExam($id) {
        $exam = Exam::findOrFail($id);
        return $exam->delete();
    }

    public function addQuestion($examId, $questionData) {
        $exam = Exam::findOrFail($examId);
        return $exam->questions()->create($questionData);
    }

    public function updateQuestion($questionId, $questionData) {
        $question = QuizQuestion::findOrFail($questionId);
        $question->update($questionData);
        return $question;
    }

    public function deleteQuestion($questionId) {
        $question = QuizQuestion::findOrFail($questionId);
        return $question->delete();
    }
}
