package com.codearena.backend.dto;

import com.codearena.backend.enums.SubmissionStatus;

public record SubmissionResultResponse(
        Long id,
        Long testCaseId,
        SubmissionStatus status,
        Boolean passed,
        String actualOutput,
        String expectedOutput,
        String errorMessage,
        Long executionTime,
        Long memoryUsed
) {
}
