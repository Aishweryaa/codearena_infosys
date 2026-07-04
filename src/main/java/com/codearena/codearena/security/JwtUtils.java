package com.codearena.codearena.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtils {

    // A secure 256-bit base64-encoded secret key string
	private static final String SECRET_KEY = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";


    // TASK 2: JWT GENERATION
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts.builder()
                .claims(extraClaims)                         // 0.12+ syntax instead of setClaims()
                .subject(userDetails.getUsername())          // 0.12+ syntax instead of setSubject()
                .issuedAt(new Date(System.currentTimeMillis())) // 0.12+ syntax instead of setIssuedAt()
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24 hours
                .signWith(getSignInKey())                    // Automatically determines HS256 algorithm
                .compact();
    }

    // TASK 3: JWT VALIDATION
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()                          // Replaces the broken builder/parser mashup
                .verifyWith(getSignInKey())           // 0.12+ syntax instead of setSigningKey()
                .build()
                .parseSignedClaims(token)             // 0.12+ syntax instead of parseClaimsJws()
                .getPayload();                        // 0.12+ syntax instead of getBody()
    }

    private SecretKey getSignInKey() {                // Returns SecretKey required by modern jjwt versions
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
