<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
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

        // Generate Access Token (30 minutes as per config)
        $accessToken = JWTAuth::customClaims(['type' => 'access'])->fromUser($user);

        // Generate Refresh Token (5 hours)
        $refreshToken = JWTAuth::customClaims([
            'type' => 'refresh',
            'exp' => now()->addHours(5)->timestamp // Custom expiration
        ])->fromUser($user);

        $cookieOptions = [
            'httpOnly' => true,
            'secure' => false, // (set to false for local testing if not using HTTPS)
            'sameSite' => 'Strict',
        ];

        // Return a successful response
        return response()->json([
            'success' => true,
            'error' => false,
            'message' => 'Registration successful',
            'user_info' => $user,
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken
        ], 201)
        ->cookie('access_token', $accessToken, 30, '/', null, $cookieOptions['secure'], $cookieOptions['httpOnly'])
        ->cookie('refresh_token', $refreshToken, 300, '/', null, $cookieOptions['secure'], $cookieOptions['httpOnly']);
    }

    public function login(Request $request)
    {
        // Single validation
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:4',
        ]);

        // Delegate login logic to AuthService
        $user = $this->authService->login($validated);

        if (!$user) {
            return response()->json([
                'success' => false,
                'error' => true,
                'message' => 'Invalid email or password',
            ], 401); // 401 Unauthorized status code
        }

        // Generate tokens
        // Generate Access Token (30 minutes as per config)
        $accessToken = JWTAuth::customClaims(['type' => 'access'])->fromUser($user);

        // Generate Refresh Token (5 hours)
        $refreshToken = JWTAuth::customClaims([
            'type' => 'refresh',
            'exp' => now()->addHours(5)->timestamp // Custom expiration
        ])->fromUser($user);
        $cookieOptions = [
            'httpOnly' => true,
            'secure' => false, // (set to false for local testing if not using HTTPS)
            'sameSite' => 'Strict',
        ];

        return response()->json([
            'success' => true,
            'error' => false,
            'message' => 'Login successful',
            'user_info' => $user,
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
        ], 200)
        ->cookie('access_token', $accessToken, 30, '/', null, $cookieOptions['secure'], $cookieOptions['httpOnly'])
        ->cookie('refresh_token', $refreshToken, 300, '/', null, $cookieOptions['secure'], $cookieOptions['httpOnly']);
        
    }

    public function logout(Request $request)
    {
        $res = $this->authService->logout();
        if($res){
            return response()->json([
                    'success' => true,
                    'error' => false,
                    'message' => 'Logged out successfully',
                ], 200)
                ->withCookie(Cookie::forget('access_token'))
                ->withCookie(Cookie::forget('refresh_token'));
        }else{
             return response()->json([
                'success' => false,
                'error' => true,
                'message' => 'Failed to log out',
                
            ], 500);
        }
    }
}
