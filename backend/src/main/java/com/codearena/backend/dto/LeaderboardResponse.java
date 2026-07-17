package com.codearena.backend.dto;

public record LeaderboardResponse(
        Long rank,
        Long userId,
        String username,
        String email,
        Integer problemsSolved,
        Integer totalSubmissions,
        Integer acceptedSubmissions,
        Integer score
) {
}
