package com.codearena.codearena.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.codearena.codearena.dto.SubmissionRequest;
import com.codearena.codearena.model.Submission;
import com.codearena.codearena.service.SubmissionService;
import com.codearena.codearena.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/v1/submissions")
public class SubmissionController {

    private final SubmissionService submissionService;
    private final UserRepository userRepository;

    public SubmissionController(SubmissionService submissionService, UserRepository userRepository) {
        this.submissionService = submissionService;
        this.userRepository = userRepository;
    }

    // 1. Student Submits Code Track (Accessible by authenticated users)
    @PostMapping
    public ResponseEntity<Submission> submitCode(@RequestBody SubmissionRequest request, 
                                                 @AuthenticationPrincipal UserDetails userDetails) {
        // Resolve authenticated database user identifier value target
        com.codearena.codearena.model.User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Authenticated Context User profile mismatch"));
                
        Submission savedSubmission = submissionService.createSubmission(request, user.getId());
        return ResponseEntity.status(201).body(savedSubmission);
    }

    // 2. Fetch History of Submissions for current logged in User Profile
    @GetMapping("/my")
    public ResponseEntity<List<Submission>> getMySubmissions(@AuthenticationPrincipal UserDetails userDetails) {
        com.codearena.codearena.model.User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Authenticated Context User profile mismatch"));
                
        return ResponseEntity.ok(submissionService.getUserSubmissions(user.getId()));
    }

    // 🌟 PERMANENT FIX: Placed BEFORE /{id} to intercept string path correctly!
    // 3. Fetch global leaderboard ranking metrics
    @GetMapping("/leaderboard")
    public ResponseEntity<List<java.util.Map<String, Object>>> getLeaderboard() {
        return ResponseEntity.ok(submissionService.getLeaderboard());
    }

    // 4. Fetch detailed individual test outcome status parameters
    @GetMapping("/{id}")
    public ResponseEntity<Submission> getSubmissionDetails(@PathVariable Long id) {
        return ResponseEntity.ok(submissionService.getSubmissionById(id));
    }
}
