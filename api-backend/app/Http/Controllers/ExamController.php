<?php

namespace App\Http\Controllers;

use App\Services\ExamService;
use Illuminate\Http\Request;

class ExamController extends Controller {
    protected $examService;

    public function __construct(ExamService $examService) {
        $this->examService = $examService;
    }

    public function index() {
        return response()->json($this->examService->getAllExams());
    }

    public function show($id) {
        return response()->json($this->examService->getExamById($id));
    }

    public function store(Request $request) {
        $data = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'teacher_id' => 'required|exists:teachers,id',
            'name' => 'required|string',
            'total_marks' => 'required|integer',
            'duration' => 'required|integer',
            'date' => 'required|date',
        ]);
        return response()->json($this->examService->createExam($data));
    }

    public function update(Request $request, $id) {
        $data = $request->validate([
            'course_id' => 'sometimes|exists:courses,id',
            'teacher_id' => 'sometimes|exists:teachers,id',
            'name' => 'sometimes|string',
            'total_marks' => 'sometimes|integer',
            'duration' => 'sometimes|integer',
            'date' => 'sometimes|date',
        ]);
        return response()->json($this->examService->updateExam($id, $data));
    }

    public function destroy($id) {
        return response()->json(['deleted' => $this->examService->deleteExam($id)]);
    }

    public function addQuestion(Request $request, $examId) {
        $data = $request->validate([
            'question' => 'required|string',
            'option_a' => 'required|string',
            'option_b' => 'required|string',
            'option_c' => 'required|string',
            'option_d' => 'required|string',
            'correct_option' => 'required|in:A,B,C,D',
        ]);
        return response()->json($this->examService->addQuestion($examId, $data));
    }

    public function updateQuestion(Request $request, $questionId) {
        $data = $request->validate([
            'question' => 'sometimes|string',
            'option_a' => 'sometimes|string',
            'option_b' => 'sometimes|string',
            'option_c' => 'sometimes|string',
            'option_d' => 'sometimes|string',
            'correct_option' => 'sometimes|in:A,B,C,D',
        ]);
        return response()->json($this->examService->updateQuestion($questionId, $data));
    }

    public function deleteQuestion($questionId) {
        return response()->json(['deleted' => $this->examService->deleteQuestion($questionId)]);
    }
}
