package com.codearena.backend.dto;

public record UserDashboardResponse(
        long availableProblems,
        long totalSubmissions,
        long acceptedSubmissions,
        long problemsSolved,
        long leaderboardRank,
        int score
) {
}
