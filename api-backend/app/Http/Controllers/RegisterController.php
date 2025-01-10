<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(Request $request)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:4|confirmed',
            'name' => 'required|string|max:255',
        ]);

        // Pass validated data to the AuthService for registration
        $user = $this->authService->register($validated);

        // Return a successful response
        return response()->json(['message' => 'Registration successful', 'user' => $user], 201);
    }
}
