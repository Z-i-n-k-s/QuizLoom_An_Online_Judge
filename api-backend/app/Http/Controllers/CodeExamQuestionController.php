<?php

namespace App\Http\Controllers;

use App\Models\CodeExamQuestion;
use App\Services\CodeExamQuestionService;
use Illuminate\Http\Request;

class CodeExamQuestionController extends Controller
{
    protected $codeExamQuestionService;

    public function __construct(CodeExamQuestionService $codeExamQuestionService)
    {
        $this->codeExamQuestionService = $codeExamQuestionService;
    }

    /**
     * Display a listing of code exam questions.
     */
    public function index()
    {
        return response()->json($this->codeExamQuestionService->getAll());
    }

    /**
     * Store a newly created code exam question.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'exam_id' => 'required|exists:exams,id',
            'question' => 'required|string',
            'max_marks' => 'required|integer|min:1',
        ]);

        $question = $this->codeExamQuestionService->create($validated);

        return response()->json($question, 201);
    }

    /**
     * Display the specified code exam question.
     */
    public function show($id)
    {
        $question = $this->codeExamQuestionService->getById($id);

        if (!$question) {
            return response()->json(['message' => 'Question not found'], 404);
        }

        return response()->json($question);
    }

    /**
     * Update the specified code exam question.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'question' => 'sometimes|required|string',
            'max_marks' => 'sometimes|required|integer|min:1',
        ]);

        $updatedQuestion = $this->codeExamQuestionService->update($id, $validated);

        if (!$updatedQuestion) {
            return response()->json(['message' => 'Question not found'], 404);
        }

        return response()->json($updatedQuestion);
    }

    /**
     * Remove the specified code exam question.
     */
    public function destroy($id)
    {
        $deleted = $this->codeExamQuestionService->delete($id);

        if (!$deleted) {
            return response()->json(['message' => 'Question not found'], 404);
        }

        return response()->json(['message' => 'Question deleted successfully']);
    }
}
