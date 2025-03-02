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
            'lecture_id'   => 'required|exists:lectures,id',
            'name'         => 'required|string',
            'total_marks'  => 'required|integer',
            'duration'     => 'required|integer',
            'date'         => 'required|date',
        ]);
        return response()->json($this->examService->createExam($data));
    }

    public function update(Request $request, $id) {
        $data = $request->validate([
            'lecture_id'   => 'sometimes|exists:lectures,id',
            'name'         => 'sometimes|string',
            'total_marks'  => 'sometimes|integer',
            'duration'     => 'sometimes|integer',
            'date'         => 'sometimes|date',
        ]);
        return response()->json($this->examService->updateExam($id, $data));
    }

    public function destroy($id) {
        return response()->json(['deleted' => $this->examService->deleteExam($id)]);
    }

    /**
     * Feature: Students can view their upcoming exams.
     * This method assumes that the ExamService filters exams based on the current date
     * and further restricts them to courses the student is enrolled in.
     *
     * @param int $studentId
     * @return \Illuminate\Http\JsonResponse
     */
    public function upcomingExamsForStudent($studentId) {
        return response()->json($this->examService->getUpcomingExamsForStudent($studentId));
    }
}
