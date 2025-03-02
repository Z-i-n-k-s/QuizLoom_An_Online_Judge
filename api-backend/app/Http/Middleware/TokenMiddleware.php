<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Services\JwtService;
use Illuminate\Validation\UnauthorizedException;

class TokenMiddleware
{
    protected $jwtService;

    public function __construct(JwtService $jwtService)
    {
        $this->jwtService = $jwtService;
    }

    /**
     * Handle an incoming request.
     *
     * This middleware checks if an access token is present in the Authorization header.
     * If not, it looks for a refresh token in the "Refresh-Token" header, validates it,
     * and issues a new access token. The token is then validated and the user ID is attached
     * to the request for further processing.
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
            // If the header starts with "Bearer " (case-insensitive), extract the token.
            if (stripos($authHeader, 'Bearer ') === 0) {
                $accessToken = substr($authHeader, 7);
            } else {
                // Otherwise, assume the entire header is the token.
                $accessToken = $authHeader;
            }
        }

        // Get the refresh token (this example assumes it comes in a custom header).
        $refreshToken = $request->header('Refresh-Token');

        // If no access token is provided but a refresh token is available, validate and issue a new access token.
        if (!$accessToken && $refreshToken) {
            try {
                $this->jwtService->validateJwtToken($refreshToken);
                $claims = $this->jwtService->parseJwtToken($refreshToken);
                if ($claims->type !== 'refresh') {
                    throw new UnauthorizedException("Invalid token type for refresh.");
                }
                // Issue a new access token using details from the refresh token.
                $userId = $claims->uid;
                $userRole = $claims->user_role;
                $accessToken = $this->jwtService->issueJwtToken($userId, $userRole, 'access');
                // Optionally, attach the new token to the request header so that the client or downstream code can use it.
                $request->headers->set('Authorization', 'Bearer ' . $accessToken);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Invalid refresh token: ' . $e->getMessage()], 401);
            }
        }

        // If still no access token, return an unauthorized error.
        if (!$accessToken) {
            return response()->json(['error' => 'No access token provided'], 401);
        }

        // Validate the access token.
        try {
            $this->jwtService->validateJwtToken($accessToken);
            $claims = $this->jwtService->parseJwtToken($accessToken);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid access token'], 401);
        }

        // Attach the user data (e.g., user id and role) to the request attributes.
        $request->attributes->set('user_id', $claims->uid);
        $request->attributes->set('user_role', $claims->user_role);
       // error_log($request);
        // Continue to the next middleware or controller.
        return $next($request);
    }
}
