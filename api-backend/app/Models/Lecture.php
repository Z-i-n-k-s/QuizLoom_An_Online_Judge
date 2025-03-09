<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lecture extends Model
{
    protected $fillable = [
        'course_id', 'title', 'lecture_data',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function exam()
    {
        return $this->hasOne(Exam::class);
    }
    
    /**
     * Get all questions asked by students on this lecture.
     */
    public function questions()
    {
        return $this->hasMany(LectureQuestion::class);
    }
}
