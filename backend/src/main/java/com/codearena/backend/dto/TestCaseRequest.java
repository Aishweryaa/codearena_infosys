package com.codearena.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

public record TestCaseRequest(

        String input,

        @NotBlank(message = "Expected output is required")
        String expectedOutput,

        Boolean hidden,

        @Min(value = 1, message = "Display order must be at least 1")
        Integer displayOrder
) {
}