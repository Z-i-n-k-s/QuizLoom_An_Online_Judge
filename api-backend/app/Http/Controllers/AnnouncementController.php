<?php

namespace App\Http\Controllers;

use App\Services\AnnouncementService;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    protected $announcementService;

    public function __construct(AnnouncementService $announcementService)
    {
        $this->announcementService = $announcementService;
    }

    public function index($courseId)
    {
        // List all announcements for a given course.
        return response()->json($this->announcementService->getAnnouncementsByCourseId($courseId));
    }

    public function show($id)
    {
        return response()->json($this->announcementService->getAnnouncementById($id));
    }

    public function store(Request $request, $courseId)
    {
        error_log($request);
        $data = $request->validate([
            'teacher_id' => 'required|exists:teachers,id',
            'title' => 'required|string',
            'message' => 'required|string',
        ]);
        return response()->json($this->announcementService->createAnnouncement($courseId, $data));
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'title' => 'sometimes|string',
            'message' => 'sometimes|string',
        ]);
        return response()->json($this->announcementService->updateAnnouncement($id, $data));
    }

    public function destroy($id)
    {
        return response()->json(['deleted' => $this->announcementService->deleteAnnouncement($id)]);
    }
    public function getAnnouncementsByTeacher($teacherId)
    {
        return response()->json($this->announcementService->getAnnouncementsByTeacher($teacherId));
    }
    public function getAnnouncementsForStudent($studentId)
{
    return response()->json($this->announcementService->getAnnouncementsForStudent($studentId));
}
}
