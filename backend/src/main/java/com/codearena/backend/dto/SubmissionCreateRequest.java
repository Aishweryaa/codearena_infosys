package com.codearena.backend.dto;

import com.codearena.backend.enums.Language;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record SubmissionCreateRequest(

        @NotNull(message = "Problem ID is required")
        Long problemId,

        @NotNull(message = "Programming language is required")
        Language language,

        @NotBlank(message = "Source code is required")
        @Size(max = 100000, message = "Source code is too large")
        String sourceCode
) {
}
