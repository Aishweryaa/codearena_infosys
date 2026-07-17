package com.codearena.backend.dto;

import com.codearena.backend.enums.Language;
import com.codearena.backend.enums.SubmissionStatus;

import java.time.LocalDateTime;
import java.util.List;

public record SubmissionResponse(
        Long id,
        Long userId,
        String username,
        Long problemId,
        String problemTitle,
        Language language,
        String sourceCode,
        SubmissionStatus status,
        Integer score,
        Long executionTime,
        Long memoryUsed,
        String compilerOutput,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        List<SubmissionResultResponse> results
) {
}
