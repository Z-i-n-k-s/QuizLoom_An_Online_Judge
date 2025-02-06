<?php

namespace App\Services;

use App\Models\Announcement;
use App\Models\Course;
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
