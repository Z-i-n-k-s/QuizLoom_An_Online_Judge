<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model {
    use HasFactory;

    protected $fillable = ['teacher_id', 'course_code', 'name', 'completion_time', 'number_of_lectures'];

    public function teacher() {
        return $this->belongsTo(Teacher::class);
    }

    public function lectures() {
        return $this->hasMany(Lecture::class);
    }

    public function exams() {
        return $this->hasMany(Exam::class);
    }
    public function announcements()
    {
        return $this->hasMany(Announcement::class);
    }
}
