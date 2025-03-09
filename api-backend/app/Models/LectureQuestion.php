<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LectureQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'lecture_id',
        'student_id',
        'question',
    ];

    /**
     * Get the lecture associated with the question.
     */
    public function lecture()
    {
        return $this->belongsTo(Lecture::class);
    }

    /**
     * Get the student who asked the question.
     */
    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    /**
     * Get the answers for the question.
     */
    public function answers()
    {
        return $this->hasMany(LectureAnswer::class, 'question_id');
    }
}
