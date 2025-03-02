<?php

namespace App\Http\Controllers;

use App\Services\ResultService;
use Illuminate\Http\Request;

class ResultController extends Controller {
    protected $resultService;

    public function __construct(ResultService $resultService) {
        $this->resultService = $resultService;
    }

    public function index() {
        // Optionally, list all results or filter by student/exam.
        return response()->json($this->resultService->getAllResults());
    }

    public function show($id) {
        return response()->json($this->resultService->getResultById($id));
    }

    public function store(Request $request) {
        $data = $request->validate([
            'student_id' => 'required|exists:students,id',
            'exam_id' => 'required|exists:exams,id',
            'obtained_marks' => 'required|integer',
            'status' => 'required|in:passed,failed',
        ]);
        return response()->json($this->resultService->createResult($data));
    }

    public function update(Request $request, $id) {
        $data = $request->validate([
            'obtained_marks' => 'sometimes|integer',
            'status' => 'sometimes|in:passed,failed',
        ]);
        return response()->json($this->resultService->updateResult($id, $data));
    }

    public function destroy($id) {
        return response()->json(['deleted' => $this->resultService->deleteResult($id)]);
    }
}
