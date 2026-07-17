package com.codearena.backend.dto;

import java.time.LocalDateTime;

public record UserSummaryResponse(
        Long userId,
        String username,
        String email,
        String role,
        String authProvider,
        String profilePicture,
        LocalDateTime createdAt
) {
}
