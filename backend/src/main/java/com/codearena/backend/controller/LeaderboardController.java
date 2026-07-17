package com.codearena.backend.controller;

import com.codearena.backend.dto.LeaderboardResponse;
import com.codearena.backend.service.SubmissionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/leaderboard")
@Tag(name = "Leaderboard")
public class LeaderboardController {

    private final SubmissionService submissionService;

    public LeaderboardController(
            SubmissionService submissionService) {

        this.submissionService =
                submissionService;
    }

    @GetMapping
    @Operation(summary = "Get CodeArena leaderboard")
    public ResponseEntity<List<LeaderboardResponse>>
    leaderboard() {

        return ResponseEntity.ok(
                submissionService.leaderboard()
        );
    }
}
