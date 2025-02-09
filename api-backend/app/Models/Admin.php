<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasFactory;

    // Define the table associated with the model (optional if table name is the plural of the model name)
    protected $table = 'admins';

    // Define the fillable columns
    protected $fillable = [
        'user_id', 
        'name'
    ];

    // Define the relationship between Admin and User (one-to-one)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}