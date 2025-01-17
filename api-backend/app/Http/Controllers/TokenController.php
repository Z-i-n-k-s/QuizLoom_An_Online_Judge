<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class TokenController extends Controller
{
    public function refresh(Request $request)
    {
        try {
            $token = JWTAuth::parseToken()->refresh();
            return response()->json([
                'success' => true,
                'error' => false,
                'message' => 'Token refreshed successfully',
                'access_token' => $token
            ], 200);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json([
                'success' => false,
                'error' => true,
                'message' => 'Token refresh failed',
                'errors' => $e->getMessage()
            ], 401);
        }
    }
}
