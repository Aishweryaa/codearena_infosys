package com.codearena.codearena.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/problem")
public class ProblemController {

    @GetMapping
    public ResponseEntity<?> getAllProblems() {
        // Simple mock response to verify your token bypasses the security wall successfully!
        return ResponseEntity.ok(List.of(
            Map.of("id", 1, "title", "Two Sum", "difficulty", "EASY"),
            Map.of("id", 2, "title", "Reverse a String", "difficulty", "EASY")
        ));
    }
}
