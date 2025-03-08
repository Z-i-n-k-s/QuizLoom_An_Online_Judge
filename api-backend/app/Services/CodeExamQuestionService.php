<?php

namespace App\Services;

use App\Models\CodeExamQuestion;

class CodeExamQuestionService
{
    /**
     * Get all code exam questions.
     */
    public function getAll()
    {
        return CodeExamQuestion::all();
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
