<?php

namespace App\Services;

use App\Models\Admin;
use App\Models\User;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function register(array $data)
    {
         // Save the user data to the `users` table, always defaulting to 'student' role
         $user = User::create([
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'student', // Default role
        ]);

        // Check user role and save to the appropriate table
        if ($user->role == 'student') {
            // Save student data
            Student::create([
                'user_id' => $user->id,
                'name' => $data['name'],
                
            ]);
        } elseif ($user->role == 'teacher') {
            // Save teacher data
            Teacher::create([
                'user_id' => $user->id,
                'name' => $data['name'],
                
            ]);
        } elseif ($user->role == 'admin') {
            // Save admin data
            Admin::create([
                'user_id' => $user->id,
                'name' => $data['name'],
            ]);
        }

        return $user; // Return the user object after registration
    }
}
