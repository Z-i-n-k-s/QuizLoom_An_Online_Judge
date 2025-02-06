<?php

namespace App\Http\Controllers;

use App\Services\QuizQuestionService;
use Illuminate\Http\Request;

class QuizQuestionController extends Controller {
    protected $quizQuestionService;

    public function __construct(QuizQuestionService $quizQuestionService) {
        $this->quizQuestionService = $quizQuestionService;
    }

    public function index($examId) {
        // List all quiz questions for a given exam.
        return response()->json($this->quizQuestionService->getQuestionsByExamId($examId));
    }

    public function show($id) {
        return response()->json($this->quizQuestionService->getQuestionById($id));
    }

    public function store(Request $request, $examId) {
        $data = $request->validate([
            'question' => 'required|string',
            'option_a' => 'required|string',
            'option_b' => 'required|string',
            'option_c' => 'required|string',
            'option_d' => 'required|string',
            'correct_option' => 'required|in:A,B,C,D',
        ]);
        return response()->json($this->quizQuestionService->createQuestion($examId, $data));
    }

    public function update(Request $request, $id) {
        $data = $request->validate([
            'question' => 'sometimes|string',
            'option_a' => 'sometimes|string',
            'option_b' => 'sometimes|string',
            'option_c' => 'sometimes|string',
            'option_d' => 'sometimes|string',
            'correct_option' => 'sometimes|in:A,B,C,D',
        ]);
        return response()->json($this->quizQuestionService->updateQuestion($id, $data));
    }

    public function destroy($id) {
        return response()->json(['deleted' => $this->quizQuestionService->deleteQuestion($id)]);
    }
}
