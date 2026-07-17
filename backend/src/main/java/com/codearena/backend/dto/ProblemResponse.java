package com.codearena.backend.dto;

import java.time.LocalDateTime;

import com.codearena.backend.enums.Difficulty;

public record ProblemResponse(

        Long id,
        String title,
        String description,
        Difficulty difficulty,
        String category,
        String inputFormat,
        String outputFormat,
        String constraints,
        String sampleInput,
        String sampleOutput,
        Integer timeLimit,
        Integer memoryLimit,
        String createdBy,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}