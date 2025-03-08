<?php

namespace App\Services;

use App\Models\LectureQuestion;

class LectureQuestionService
{
    public function getAllQuestions()
    {
        return LectureQuestion::with(['lecture', 'student', 'answers'])->get();
    }
    public function getQuestionsWithAnswersByLectureId($lectureId)
    {
        return LectureQuestion::where('lecture_id', $lectureId)
            ->with(['student', 'answers.teacher']) // Load student info along with answers and teacher info
            ->get();
    }
    

    public function createQuestion($data)
{
    $question = LectureQuestion::create($data);

    // Eager load the student info after creating the question
    $question->load('student');

    return $question;
}


    public function getQuestionById($id)
    {
        return LectureQuestion::with(['lecture', 'student', 'answers'])->findOrFail($id);
    }

    public function updateQuestion($id, $data)
    {
        $question = LectureQuestion::findOrFail($id);
        $question->update($data);
        return $question->load(['student', 'answers.teacher']);
    }
    public function deleteQuestion($id)
    {
        $question = LectureQuestion::findOrFail($id);
        $question->delete();
        return ['message' => 'Deleted successfully'];
    }
}
