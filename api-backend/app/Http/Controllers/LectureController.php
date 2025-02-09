<?php

namespace App\Http\Controllers;

use App\Services\LectureService;
use Illuminate\Http\Request;

class LectureController extends Controller {
    protected $lectureService;

    public function __construct(LectureService $lectureService) {
        $this->lectureService = $lectureService;
    }

    public function index($courseId) {
        // List all lectures for a given course.
        return response()->json($this->lectureService->getLecturesByCourseId($courseId));
    }

    public function show($id) {
        return response()->json($this->lectureService->getLectureById($id));
    }

    public function store(Request $request, $courseId) {
        $data = $request->validate([
            'title' => 'required|string',
            'lecture_data' => 'required|string',
        ]);
        return response()->json($this->lectureService->createLecture($courseId, $data));
    }

    public function update(Request $request, $id) {
        $data = $request->validate([
            'title' => 'sometimes|string',
            'lecture_data' => 'sometimes|string',
        ]);
        return response()->json($this->lectureService->updateLecture($id, $data));
    }

    public function destroy($id) {
        return response()->json(['deleted' => $this->lectureService->deleteLecture($id)]);
    }
}
