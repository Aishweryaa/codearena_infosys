package com.codearena.backend.dto;

import com.codearena.backend.enums.Difficulty;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ProblemRequest(

        @NotBlank(message = "Title is required")
        @Size(max = 200, message = "Title cannot exceed 200 characters")
        String title,

        @NotBlank(message = "Description is required")
        String description,

        @NotNull(message = "Difficulty is required")
        Difficulty difficulty,

        @Size(max = 100, message = "Category cannot exceed 100 characters")
        String category,

        String inputFormat,

        String outputFormat,

        String constraints,

        String sampleInput,

        String sampleOutput,

        @NotNull(message = "Time limit is required")
        @Min(value = 100, message = "Time limit must be at least 100 milliseconds")
        Integer timeLimit,

        @NotNull(message = "Memory limit is required")
        @Min(value = 16, message = "Memory limit must be at least 16 MB")
        Integer memoryLimit
) {
}