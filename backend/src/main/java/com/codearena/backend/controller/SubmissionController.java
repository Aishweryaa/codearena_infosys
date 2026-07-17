package com.codearena.backend.controller;

import com.codearena.backend.dto.SubmissionCreateRequest;
import com.codearena.backend.dto.SubmissionResponse;
import com.codearena.backend.service.SubmissionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "Submissions")
public class SubmissionController {

    private final SubmissionService submissionService;

    public SubmissionController(
            SubmissionService submissionService) {

        this.submissionService =
                submissionService;
    }

    @PostMapping("/submissions")
    @Operation(summary = "Submit code for evaluation")
    public ResponseEntity<SubmissionResponse>
    createSubmission(
            @Valid
            @RequestBody
            SubmissionCreateRequest request,
            Authentication authentication) {

        SubmissionResponse response =
                submissionService
                        .createSubmission(
                                request,
                                authentication.getName()
                        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping("/submissions/me")
    @Operation(summary = "Get the logged-in user's submissions")
    public ResponseEntity<List<SubmissionResponse>>
    mySubmissions(
            Authentication authentication) {

        return ResponseEntity.ok(
                submissionService
                        .mySubmissions(
                                authentication.getName()
                        )
        );
    }

    @GetMapping("/submissions/{submissionId}")
    @Operation(summary = "Get submission details")
    public ResponseEntity<SubmissionResponse>
    getSubmission(
            @PathVariable Long submissionId,
            Authentication authentication) {

        boolean administrator =
                authentication
                        .getAuthorities()
                        .stream()
                        .anyMatch(authority ->
                                authority
                                        .getAuthority()
                                        .equals(
                                                "ROLE_ADMIN"
                                        )
                        );

        return ResponseEntity.ok(
                submissionService
                        .getSubmission(
                                submissionId,
                                authentication.getName(),
                                administrator
                        )
        );
    }

    @GetMapping("/admin/submissions")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get all platform submissions")
    public ResponseEntity<List<SubmissionResponse>>
    allSubmissions() {

        return ResponseEntity.ok(
                submissionService
                        .allSubmissions()
        );
    }
}
