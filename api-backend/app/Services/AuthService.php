<?php

namespace App\Services;

use App\Models\Admin;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;

class AuthService
{


    protected $jwtService;

    public function __construct(JwtService $jwtService)
    {
        $this->jwtService = $jwtService;
    }

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

    public function login($data){
        $user = User::where('email', $data['email'])->first();

        // Check if the user exists
        if (!$user) {
            return response()->json(['error' => 'Invalid email address'], 401); // Unauthorized
        }
 
        // Validate the password
        if (!Hash::check($data['password'], $user->password)) {
            return response()->json(['error' => 'Incorrect password'], 401); // Unauthorized
        }
        return $user;
 
    }

    public function logout($token)
    {
        try {
            $decodedToken = $this->jwtService->parseJwtToken($token);
            
            if (!$decodedToken) {
                return false;
            }

            // Add logic to blacklist token if needed (database or cache)
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}