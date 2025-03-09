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


    public function handle(Request $request, Closure $next)
    {
        // Retrieve the access token from the Authorization header.
        $authHeader = $request->header('Authorization');
        $accessToken = null;
        if ($authHeader) {
            if (stripos($authHeader, 'Bearer ') === 0) {
                $accessToken = substr($authHeader, 7);
            } else {
                $accessToken = $authHeader;
            }
        }

        // If no access token is provided, return an unauthorized error.
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

        // Attach user data to the request.
        $request->attributes->set('user_id', $claims->uid);
        $request->attributes->set('user_role', $claims->user_role);

        return $next($request);
    }
}
