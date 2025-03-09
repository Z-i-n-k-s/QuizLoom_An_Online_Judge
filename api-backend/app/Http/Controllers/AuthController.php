<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\AuthService;
use App\Services\JwtService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Validation\UnauthorizedException;

class AuthController extends Controller
{
    protected $authService;
    protected  $jwtService;


    public function __construct(AuthService $authService, JwtService $jwtService)
    {
        $this->authService = $authService;
        $this->jwtService = $jwtService;
    }


    public function refreshToken(Request $request)
    {
        $refreshToken = $request->header('X-Refresh-Token');

        if (!$refreshToken) {
            return response()->json(['error' => 'No refresh token provided'], 401);
        }

        try {
            $this->jwtService->validateJwtToken($refreshToken);
            $claims = $this->jwtService->parseJwtToken($refreshToken);
            if ($claims->type !== 'refresh') {
                throw new UnauthorizedException("Invalid token type for refresh.");
            }

            // Issue a new access token.
            $userId = $claims->uid;
            $userRole = $claims->user_role;
            $accessToken = $this->jwtService->issueJwtToken($userId, $userRole, 'access');

            return response()->json(['access_token' => $accessToken]);
        } catch (\Exception $e) {
            error_log($e->getMessage());
            return response()->json(['error' => 'Invalid refresh token: ' . $e->getMessage()], 401);
        }
    }




    public function register(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:4|confirmed',
            'name' => 'required|string|max:255',
        ]);

        if (!$validated) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $request->errors(),  // This will return specific errors
            ], 422);
        }

        // If validation passes, proceed with user creation
        $user = $this->authService->register($validated);

        $accessToken = $this->jwtService->issueJwtToken($user->id, $user->role, 'access');
        $refreshToken = $this->jwtService->issueJwtToken($user->id, $user->role, 'refresh');

        return response()->json([
            'success' => true,
            'message' => 'Registration successful',
            'user_info' => $user,
            'tokens' => [
                'access_token' => $accessToken,
                'refresh_token' => $refreshToken,
            ],
        ], 201);
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

        $accessToken = $this->jwtService->issueJwtToken($user->id, $user->role, 'access');
        $refreshToken = $this->jwtService->issueJwtToken($user->id, $user->role, 'refresh');

        // $jwtService = new JwtService();
        // $claims = $jwtService->parseJwtToken($accessToken);
        // //print_r($claims);
        // error_log(print_r($claims,true));

        // Return success response
        return response()->json([
            'success' => true,
            'error' => false,
            'message' => 'Logged in successfully',
            'user_info' => $user,
            'tokens' => [
                'access_token' => $accessToken,
                'refresh_token' => $refreshToken,
            ],
            //'claims'=>$claims
        ], 201);
    }

    public function logout(Request $request)
    {
        $userId = $request->attributes->get('userId');
        error_log($userId);

        $res = $this->authService->logout($userId);
    
        if (!$res) {
            return response()->json([
                'success' => true,
                'error' => false,
                'message' => 'Logged out successfully',
            ], 200);
        } else {
            return response()->json([
                'success' => false,
                'error' => true,
                'message' => 'Failed to log out',
            ], 500);
        }
    }

}