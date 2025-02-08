<?php

namespace App\Services;

use App\Models\Enrollment;
use App\Models\Course;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class EnrollmentService {

    public function getAllEnrollments() {
        return Enrollment::with('student', 'course')->get();
    }

    public function getEnrollmentById($id) {
        return Enrollment::with('student', 'course')->findOrFail($id);
    }

    public function createEnrollment($data) {
        return Enrollment::create($data);
    }

    public function deleteEnrollment($id) {
        $enrollment = Enrollment::findOrFail($id);
        return $enrollment->delete();
    }

    /**
     * Returns all courses that a student is enrolled in.
     */
    public function getCoursesForStudent($studentId) {
        return Enrollment::with('course')
            ->where('student_id', $studentId)
            ->get()
            ->pluck('course');
    }

    /**
     * Returns all students enrolled in a specific course.
     */
    public function getStudentsForCourse($courseId) {
        return Enrollment::with('student')
            ->where('course_id', $courseId)
            ->get()
            ->pluck('student');
    }

    /**
     * Enrolls a student in a course using the course code.
     */
    public function enrollByCourseCode($studentId, $courseCode) {
        $course = Course::where('course_code', $courseCode)->firstOrFail();

        // Optional: Check if the student is already enrolled.
        $existing = Enrollment::where('student_id', $studentId)
                              ->where('course_id', $course->id)
                              ->first();
        if ($existing) {
            throw new \Exception('Student is already enrolled in this course.');
        }

        return Enrollment::create([
            'student_id' => $studentId,
            'course_id' => $course->id,
        ]);
    }
}
