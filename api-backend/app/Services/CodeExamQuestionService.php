<?php

namespace App\Services;

use App\Models\CodeExamQuestion;
use App\Models\CodeSubmission;

class CodeExamQuestionService
{
    /**
     * Get all code exam questions.
     */
    public function getAll()
    {
        return CodeExamQuestion::with([
            'submissions',
            'exam.lecture' // Load the lecture through the exam relationship
        ])->get();
    }
    public function getAllSubmissions()
    {
        return CodeSubmission::with(['student', 'codeExamQuestion'])->get();
    }
    public function createAns(array $data)
{
    // Check if the student has already submitted for this question
    $existingSubmission = CodeSubmission::where('student_id', $data['student_id'])
        ->where('code_exam_question_id', $data['code_exam_question_id'])
        ->exists();

    if ($existingSubmission) {
        return response()->json(['message' => 'You have already submitted an answer for this question.'], 409);
    }

    // If no submission exists, create a new one
    return CodeSubmission::create($data);
}


    /**
     * Get a single code exam question by ID.
     */
    public function getById($id)
    {
        return CodeExamQuestion::find($id);
    }

    /**
     * Create a new code exam question.
     */
    public function create(array $data)
    {
        return CodeExamQuestion::create($data);
    }

    /**
     * Update an existing code exam question.
     */
    public function update($id, array $data)
    {
        $question = CodeExamQuestion::find($id);

        if (!$question) {
            return null;
        }

        $question->update($data);

        return $question;
    }

    /**
     * Delete a code exam question.
     */
    public function delete($id)
    {
        $question = CodeExamQuestion::find($id);

        if (!$question) {
            return false;
        }

        return $question->delete();
    }
}
