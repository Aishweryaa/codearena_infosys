package com.codearena.backend.dto;

public record AdminDashboardResponse(
        long totalUsers,
        long totalProblems,
        long totalSubmissions,
        long acceptedSubmissions,
        long adminUsers,
        long regularUsers
) {
}
