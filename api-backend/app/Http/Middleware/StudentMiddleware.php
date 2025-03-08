<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Services\JwtService;
use Illuminate\Validation\UnauthorizedException;

class StudentMiddleware
{
    protected $jwtService;

    public function __construct(JwtService $jwtService)
    {
        $this->jwtService = $jwtService;
    }

    /**
     * Handle an incoming request.
     *
     * This middleware validates the token (or uses a refresh token if needed)
     * and checks if the user's role is "student." If yes, the request proceeds;
     * otherwise, an unauthorized error is returned.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): \Illuminate\Http\Response  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Try to get the access token from the "Authorization" header.
        $authHeader = $request->header('Authorization');
        $accessToken = null;
        if ($authHeader) {
            if (stripos($authHeader, 'Bearer ') === 0) {
                $accessToken = substr($authHeader, 7);
            } else {
                $accessToken = $authHeader;
            }
        }

        // Get the refresh token from the custom header.
        $refreshToken = $request->header('Refresh-Token');

        // If no access token is provided but a refresh token exists, try to issue a new access token.
        if (!$accessToken && $refreshToken) {
            try {
                $this->jwtService->validateJwtToken($refreshToken);
                $claims = $this->jwtService->parseJwtToken($refreshToken);
                if ($claims->type !== 'refresh') {
                    throw new UnauthorizedException("Invalid token type for refresh.");
                }
                $userId   = $claims->uid;
                $userRole = $claims->user_role;
                $accessToken = $this->jwtService->issueJwtToken($userId, $userRole, 'access');
                $request->headers->set('Authorization', 'Bearer ' . $accessToken);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Invalid refresh token: ' . $e->getMessage()], 401);
            }
        }

        if (!$accessToken) {
            return response()->json(['error' => 'No access token provided'], 401);
        }

        try {
            $this->jwtService->validateJwtToken($accessToken);
            $claims = $this->jwtService->parseJwtToken($accessToken);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid access token'], 401);
        }

        // Check if the user's role is "student"
        if (!isset($claims->user_role) || strtolower($claims->user_role) !== 'student') {
            return response()->json(['error' => 'Unauthorized: Students only'], 401);
        }

        // Attach user data to the request attributes.
        $request->attributes->set('user_id', $claims->uid);
        $request->attributes->set('user_role', $claims->user_role);

        return $next($request);
    }
}
