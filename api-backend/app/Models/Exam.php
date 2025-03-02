<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    protected $fillable = [
        'lecture_id', 'name', 'total_marks', 'duration', 'date',
    ];

    public function lecture()
    {
        return $this->belongsTo(Lecture::class);
    }

    public function quizQuestions()
    {
        return $this->hasMany(QuizQuestion::class);
    }

    public function results()
    {
        return $this->hasMany(Result::class);
    }
}
