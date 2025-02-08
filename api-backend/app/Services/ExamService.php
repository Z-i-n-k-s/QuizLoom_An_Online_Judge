<?php

namespace App\Services;

use App\Models\Exam;
use App\Models\QuizQuestion;
use App\Models\Enrollment;
use Carbon\Carbon;

class ExamService {

    public function getAllExams() {
        return Exam::with('course', 'questions')->get();
    }

    public function getExamById($id) {
        return Exam::with('course', 'questions')->findOrFail($id);
    }

    public function createExam($data) {
        return Exam::create($data);
    }

    public function updateExam($id, $data) {
        $exam = Exam::findOrFail($id);
        $exam->update($data);
        return $exam;
    }

    public function deleteExam($id) {
        $exam = Exam::findOrFail($id);
        return $exam->delete();
    }

    public function addQuestion($examId, $data) {
        $exam = Exam::findOrFail($examId);
        return $exam->questions()->create($data);
    }

    public function updateQuestion($questionId, $data) {
        $question = QuizQuestion::findOrFail($questionId);
        $question->update($data);
        return $question;
    }

    public function deleteQuestion($questionId) {
        $question = QuizQuestion::findOrFail($questionId);
        return $question->delete();
    }

    /**
     * Returns upcoming exams for a given student.
     * Assumes the student is enrolled in courses, and the exam's date is compared with today's date.
     */
    public function getUpcomingExamsForStudent($studentId) {
        // Get all course IDs where the student is enrolled.
        $courseIds = Enrollment::where('student_id', $studentId)->pluck('course_id')->toArray();
        $today = Carbon::today()->toDateString();

        return Exam::with('course', 'questions')
            ->whereIn('course_id', $courseIds)
            ->where('date', '>=', $today)
            ->get();
    }
}
