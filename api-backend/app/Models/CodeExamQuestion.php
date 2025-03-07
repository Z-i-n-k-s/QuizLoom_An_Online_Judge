<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CodeExamQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_id',
        'question',
        'max_marks',
    ];

    /**
     * Get the exam this code question belongs to.
     */
    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }

    /**
     * Get all code submissions for this exam question.
     */
    public function submissions()
    {
        return $this->hasMany(CodeSubmission::class, 'code_exam_question_id');
    }
}
