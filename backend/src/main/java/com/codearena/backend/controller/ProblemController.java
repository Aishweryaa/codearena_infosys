package com.codearena.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codearena.backend.dto.ProblemRequest;
import com.codearena.backend.dto.ProblemResponse;
import com.codearena.backend.dto.TestCaseRequest;
import com.codearena.backend.dto.TestCaseResponse;
import com.codearena.backend.service.ProblemService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/problems")
@Tag(name = "Problems")
public class ProblemController {

    private final ProblemService problemService;

    public ProblemController(
            ProblemService problemService) {

        this.problemService = problemService;
    }

    @GetMapping
    @Operation(summary = "Get all coding problems")
    public ResponseEntity<List<ProblemResponse>>
    getAllProblems() {

        return ResponseEntity.ok(
                problemService.getAllProblems()
        );
    }

    @GetMapping("/{problemId}")
    @Operation(summary = "Get a problem by ID")
    public ResponseEntity<ProblemResponse>
    getProblemById(
            @PathVariable Long problemId) {

        return ResponseEntity.ok(
                problemService.getProblemById(
                        problemId
                )
        );
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create a new problem")
    public ResponseEntity<ProblemResponse>
    createProblem(
            @Valid
            @RequestBody
            ProblemRequest request,
            Authentication authentication) {

        ProblemResponse response =
                problemService.createProblem(
                        request,
                        authentication.getName()
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping("/{problemId}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update an existing problem")
    public ResponseEntity<ProblemResponse>
    updateProblem(
            @PathVariable Long problemId,
            @Valid
            @RequestBody
            ProblemRequest request) {

        return ResponseEntity.ok(
                problemService.updateProblem(
                        problemId,
                        request
                )
        );
    }

    @DeleteMapping("/{problemId}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete a problem")
    public ResponseEntity<Void>
    deleteProblem(
            @PathVariable Long problemId) {

        problemService.deleteProblem(problemId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{problemId}/testcases")
    @Operation(summary = "Get test cases for a problem")
    public ResponseEntity<List<TestCaseResponse>>
    getTestCases(
            @PathVariable Long problemId,
            Authentication authentication) {

        boolean admin = authentication
                .getAuthorities()
                .stream()
                .anyMatch(authority ->
                        authority
                                .getAuthority()
                                .equals("ROLE_ADMIN")
                );

        return ResponseEntity.ok(
                problemService.getTestCases(
                        problemId,
                        admin
                )
        );
    }

    @PostMapping("/{problemId}/testcases")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Add a test case to a problem")
    public ResponseEntity<TestCaseResponse>
    createTestCase(
            @PathVariable Long problemId,
            @Valid
            @RequestBody
            TestCaseRequest request) {

        TestCaseResponse response =
                problemService.createTestCase(
                        problemId,
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}