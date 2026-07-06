package com.codearena.codearena.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codearena.codearena.dto.ProblemRequest;
import com.codearena.codearena.model.Problem;
import com.codearena.codearena.model.TestCase; // Added missing import
import com.codearena.codearena.service.ProblemService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/problem")
public class ProblemController {

    private final ProblemService problemService;

    public ProblemController(ProblemService problemService) {
        this.problemService = problemService;
    }

    // 1. Create Problem (Restricted to ADMIN)
    @PostMapping
    public ResponseEntity<Problem> createProblem(@RequestBody ProblemRequest request) {
        Problem savedProblem = problemService.createProblem(request);
        return ResponseEntity.status(201).body(savedProblem);
    }

    // 2. View All Problems (Accessible by both USER and ADMIN)
    @GetMapping
    public ResponseEntity<List<Problem>> getAllProblems() {
        List<Problem> problems = problemService.getAllProblems();
        return ResponseEntity.ok(problems);
    }

    // 🌟 3. Get Single Problem by ID (Accessible by both USER and ADMIN)
    @GetMapping("/{id}")
    public ResponseEntity<Problem> getProblemById(@PathVariable Long id) {
        Problem problem = problemService.getProblemById(id);
        return ResponseEntity.ok(problem);
    }

    // 🌟 4. Update Problem (Restricted to ADMIN)
    @PutMapping("/{id}")
    public ResponseEntity<Problem> updateProblem(@PathVariable Long id, @RequestBody ProblemRequest request) {
        Problem updatedProblem = problemService.updateProblem(id, request);
        return ResponseEntity.ok(updatedProblem);
    }

    // 🌟 5. Delete Problem (Restricted to ADMIN)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProblem(@PathVariable Long id) {
        problemService.deleteProblem(id);
        return ResponseEntity.noContent().build();
    }

    // 🌟 6. ADD TEST CASES (Restricted to ADMIN)
    @PostMapping("/{id}/testcases")
    public ResponseEntity<TestCase> addTestCase(
            @PathVariable Long id, 
            @RequestBody TestCase testCase) {
        TestCase savedTestCase = problemService.addTestCase(id, testCase);
        return ResponseEntity.status(201).body(savedTestCase);
    }

    // 🌟 7. VIEW TEST CASES FOR A PROBLEM (Accessible by both USER and ADMIN)
    @GetMapping("/{id}/testcases")
    public ResponseEntity<List<TestCase>> getTestCases(@PathVariable Long id) {
        return ResponseEntity.ok(problemService.getTestCasesForProblem(id));
    }
}
