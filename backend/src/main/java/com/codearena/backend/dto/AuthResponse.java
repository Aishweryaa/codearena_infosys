package com.codearena.backend.dto;

public record AuthResponse(
        String message,
        String token,
        Long userId,
        String username,
        String email,
        String role,
        String profilePicture
) {
}
