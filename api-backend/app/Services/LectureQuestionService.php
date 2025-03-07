<?php

namespace App\Services;

use App\Models\LectureQuestion;

class LectureQuestionService
{
    public function getAllQuestions()
    {
        return LectureQuestion::with(['lecture', 'student', 'answers'])->get();
    }

    public function createQuestion($data)
    {
        return LectureQuestion::create($data);
    }

    public function getQuestionById($id)
    {
        return LectureQuestion::with(['lecture', 'student', 'answers'])->findOrFail($id);
    }

    public function updateQuestion($id, $data)
    {
        $question = LectureQuestion::findOrFail($id);
        $question->update($data);
        return $question;
    }

    public function deleteQuestion($id)
    {
        $question = LectureQuestion::findOrFail($id);
        $question->delete();
        return ['message' => 'Deleted successfully'];
    }
}
