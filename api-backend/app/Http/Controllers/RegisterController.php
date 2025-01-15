<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\Facades\JWTAuth;

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
        $validator = Validator($request->all(), [
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:4|confirmed',
            'name' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => true,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422); // 422 Unprocessable Entity status code
        }

        $validated = $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:4|confirmed',
            'name' => 'required|string|max:255',
        ]);

        // Pass validated data to the AuthService for registration
        $user = $this->authService->register($validated);

        // $token = JWTAuth::fromUser($user);

        $accessToken = JWTAuth::fromUser($user);
        $refreshToken = JWTAuth::customClaims(['refresh' => true])->fromUser($user);

        // Return a successful response
        return response()->json([
            'success' => true,
            'error' => false,
            'message' => 'Registration successful',
            'user_info' => $user,
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken
        ], 201);
    }
}
