<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LectureAnswer extends Model
{
    use HasFactory;

    protected $fillable = [
        'question_id',
        'teacher_id',
        'answer',
    ];

    /**
     * Get the question that this answer belongs to.
     */
    public function question()
    {
        return $this->belongsTo(LectureQuestion::class);
    }

    /**
     * Get the teacher who provided the answer.
     */
    public function teacher()
    {
        return $this->belongsTo(Teacher::class);
    }
}
