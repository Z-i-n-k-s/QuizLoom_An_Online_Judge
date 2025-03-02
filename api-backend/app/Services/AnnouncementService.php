<?php

namespace App\Services;

use App\Models\Announcement;
use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AnnouncementService {

    public function getAnnouncementsByCourseId($courseId) {
        $course = Course::findOrFail($courseId);
        return $course->announcements;
    }

    public function getAnnouncementById($id) {
        return Announcement::findOrFail($id);
    }

    public function createAnnouncement($courseId, $data) {
        $course = Course::findOrFail($courseId);
        return $course->announcements()->create($data);
    }
    public function getAnnouncementsByTeacher($teacherId)
    {
        return Announcement::where('teacher_id', $teacherId)->get();
    }
    public function getAnnouncementsForStudent($studentId)
    {
        // Retrieve all course IDs for the student.
        $courseIds = Enrollment::where('student_id', $studentId)->pluck('course_id')->toArray();

        // Fetch all announcements for those courses, eager loading the teacher relation.
        return Announcement::with('teacher')
            ->whereIn('course_id', $courseIds)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function updateAnnouncement($id, $data) {
        $announcement = Announcement::findOrFail($id);
        $announcement->update($data);
        return $announcement;
    }

    public function deleteAnnouncement($id) {
        $announcement = Announcement::findOrFail($id);
        return $announcement->delete();
    }
}
