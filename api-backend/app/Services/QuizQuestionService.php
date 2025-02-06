<?php

namespace App\Services;

use App\Models\QuizQuestion;
use App\Models\Exam;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class QuizQuestionService {

    public function getQuestionsByExamId($examId) {
        $exam = Exam::findOrFail($examId);
        return $exam->questions;
    }

    public function getQuestionById($id) {
        return QuizQuestion::findOrFail($id);
    }

    public function createQuestion($examId, $data) {
        $exam = Exam::findOrFail($examId);
        return $exam->questions()->create($data);
    }

    public function updateQuestion($id, $data) {
        $question = QuizQuestion::findOrFail($id);
        $question->update($data);
        return $question;
    }

    public function deleteQuestion($id) {
        $question = QuizQuestion::findOrFail($id);
        return $question->delete();
    }
}
