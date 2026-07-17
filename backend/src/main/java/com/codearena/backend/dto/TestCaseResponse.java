package com.codearena.backend.dto;

public record TestCaseResponse(

        Long id,
        Long problemId,
        String input,
        String expectedOutput,
        Boolean hidden,
        Integer displayOrder
) {
}