<?php

declare(strict_types=1);

namespace App\Services; // Add this if it's in the `Services` namespace.

use DateTimeImmutable;
use Illuminate\Validation\UnauthorizedException;
use Lcobucci\JWT\Encoding\ChainedFormatter;
use Lcobucci\JWT\Encoding\JoseEncoder;
use Lcobucci\JWT\Signer\Key\InMemory;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Token\Builder;
use Lcobucci\JWT\Encoding\CannotDecodeContent;
use Lcobucci\JWT\Token\InvalidTokenStructure;
use Lcobucci\JWT\Token\Parser;
use Lcobucci\JWT\Token\UnsupportedHeaderFound;





class JwtService
{
    /**
     * Issue a JWT token.
     *
     * @param int|string $userId The user ID to include in the token.
     * @param string $tokenType The type of token ('access' or 'refresh').
     * @return string The generated JWT token as a string.
     * @throws \Exception If random bytes for the token ID cannot be generated.
     */
    public function issueJwtToken($userId, $userRole, string $tokenType): string
    {
        // Create token builder and define the signing algorithm
        $tokenBuilder = new Builder(new JoseEncoder(), ChainedFormatter::default());
        $algorithm = new Sha256();

        // Retrieve signing key from app configuration
        $jwtSecret = config('app.jwt_secret');
        if (!$jwtSecret) {
            throw new \RuntimeException('JWT secret is not configured. Please set "app.jwt_secret" in your .env file.');
        }

        $signingKey = InMemory::plainText($jwtSecret);

        // Current time and expiration time
        $now = new DateTimeImmutable();
        $expirationTime = $tokenType === 'access' ? '+20 minutes' : '+6 hours';

        // Build the token
        $token = $tokenBuilder
            ->issuedBy(config('app.url')) // Set the issuer (your app's URL)
            ->permittedFor(config('app.url')) // Set the audience (your app's URL)
            ->identifiedBy(bin2hex(random_bytes(16))) // Unique token ID
            ->issuedAt($now) // Current timestamp as the issued time
            ->expiresAt($now->modify($expirationTime)) // Expiration time
            ->withClaim('uid', $userId) // Custom claim: User ID
            ->withClaim('user_role', $userRole) // Custom claim: User ID
            ->withClaim('type', $tokenType) // Custom claim: Token type
            ->getToken($algorithm, $signingKey); // Sign the token

        // Return the token as a string
        return $token->toString();
    }


    public function parseJwtToken(string $jwt)
    {
        try {
            $parser = new Parser(new JoseEncoder());
            $token = $parser->parse($jwt);
            // Extract all claims and convert to an object
            $claims = $token->claims()->all();
            return (object) $claims;
        } catch (CannotDecodeContent | InvalidTokenStructure | UnsupportedHeaderFound $e) {
            throw new UnauthorizedException($e->getMessage());
        }
    }




    public function validateJwtToken(string $jwt)
    {
        if (!$jwt) {
            throw new UnauthorizedException("No JWT token provided");
        }

        try {
            $parser = new Parser(new JoseEncoder());
            $parser->parse($jwt);
        } catch (\Exception $e) {
            throw new UnauthorizedException("Invalid Token");
        }
    }
}
