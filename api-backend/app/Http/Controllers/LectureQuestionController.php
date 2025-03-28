<?php

namespace App\Http\Controllers;

use App\Models\LectureQuestion;
use App\Services\LectureQuestionService;
use Illuminate\Http\Request;

class LectureQuestionController extends Controller
{
    protected $lectureQuestionService;

    public function __construct(LectureQuestionService $lectureQuestionService)
    {
        $this->lectureQuestionService = $lectureQuestionService;
    }

    public function index()
    {
        return response()->json($this->lectureQuestionService->getAllQuestions());
    }
    public function getQuestionsWithAnswers($lectureId)
{
    return response()->json($this->lectureQuestionService->getQuestionsWithAnswersByLectureId($lectureId));
}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'lecture_id' => 'required|exists:lectures,id',
            'student_id' => 'required|exists:students,id',
            'question' => 'required|string|max:500',
        ]);

        return response()->json($this->lectureQuestionService->createQuestion($validated));
    }

    public function show($id)
    {
        return response()->json($this->lectureQuestionService->getQuestionById($id));
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'question' => 'sometimes|string|max:500',
        ]);

        return response()->json($this->lectureQuestionService->updateQuestion($id, $validated));
    }

    public function destroy($id)
    {
        return response()->json($this->lectureQuestionService->deleteQuestion($id));
    }
    public function storeAnswer(Request $request)
{
    $validated = $request->validate([
        'question_id' => 'required|exists:lecture_questions,id',
        'teacher_id' => 'required|exists:teachers,id',
        'answer' => 'required|string|max:1000',
    ]);

    return response()->json($this->lectureQuestionService->createAnswer($validated));
}

}
