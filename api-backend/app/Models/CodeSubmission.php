<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CodeSubmission extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'code_exam_question_id',
        'submitted_code',
        'language',
        'teacher_comment',
        'marks_awarded',
    ];

    /**
     * Get the student who made this submission.
     */
    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    /**
     * Get the code exam question associated with this submission.
     */
    public function codeExamQuestion()
    {
        return $this->belongsTo(CodeExamQuestion::class);
    }
}
