<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    // Define the table associated with the model (optional if table name is the plural of the model name)
    protected $table = 'teachers';

    // Define the fillable columns
    protected $fillable = [
        'user_id',
        'name',
        'contact_info',
        'status'
    ];

    // Define the relationship between Teacher and User (one-to-one)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Additional relationship: Teacher has many courses
    // public function courses()
    // {
    //     return $this->hasMany(Course::class);
    // }
}
