package com.codearena.codearena.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codearena.codearena.dto.SubmissionRequest;
import com.codearena.codearena.model.Problem;
import com.codearena.codearena.model.Submission;
import com.codearena.codearena.model.SubmissionResult;
import com.codearena.codearena.model.TestCase;
import com.codearena.codearena.repository.ProblemRepository;
import com.codearena.codearena.repository.SubmissionRepository;
import com.codearena.codearena.repository.TestCaseRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final ProblemRepository problemRepository;
    private final TestCaseRepository testCaseRepository;
    private final CodeExecutionEngine codeExecutionEngine;
    private final RateLimiterService rateLimiterService; // 🌟 Injected

    public SubmissionService(SubmissionRepository submissionRepository,
                             ProblemRepository problemRepository,
                             TestCaseRepository testCaseRepository,
                             CodeExecutionEngine codeExecutionEngine,
                             RateLimiterService rateLimiterService) {
        this.submissionRepository = submissionRepository;
        this.problemRepository = problemRepository;
        this.testCaseRepository = testCaseRepository;
        this.codeExecutionEngine = codeExecutionEngine;
        this.rateLimiterService = rateLimiterService;
    }

    public List<Map<String, Object>> getLeaderboard() {
        return submissionRepository.getLeaderboardData();
    }

    public Submission createSubmission(SubmissionRequest request, Long userId) {
        // 🌟 1. HANDLED RATE LIMITING (Member 1 Deliverable)
        if (!rateLimiterService.isAllowed(userId)) {
            Submission rateLimitedSubmission = new Submission();
            rateLimitedSubmission.setStatus("TOO_MANY_REQUESTS");
            rateLimitedSubmission.setSourceCode(request.getSourceCode());
            rateLimitedSubmission.setLanguage(request.getLanguage());
            return rateLimitedSubmission;
        }

        Problem problem = problemRepository.findById(request.getProblemId())
                .orElseThrow(() -> new RuntimeException("Problem not found with id: " + request.getProblemId()));

        Submission submission = new Submission();
        submission.setProblem(problem);
        submission.setUserId(userId);
        submission.setSourceCode(request.getSourceCode());
        submission.setLanguage(request.getLanguage());
        submission.setSubmittedAt(LocalDateTime.now());
        submission.setStatus("PENDING");

        List<TestCase> testCases = testCaseRepository.findByProblemId(problem.getId());
        submission.setTotalTestCases(testCases.size());

        if (testCases.isEmpty()) {
            submission.setStatus("ACCEPTED");
            submission.setTotalPassed(0);
            return submissionRepository.save(submission);
        }

        List<SubmissionResult> individualResults = new ArrayList<>();
        int passedCount = 0;
        String finalGlobalStatus = "ACCEPTED";

        for (TestCase tc : testCases) {
            SubmissionResult res = new SubmissionResult();
            res.setSubmission(submission);
            res.setTestCase(tc);

            CodeExecutionEngine.ExecutionResult execRes = codeExecutionEngine.executeCode(
                    request.getLanguage(),
                    request.getSourceCode(),
                    tc.getInput()
            );

            res.setExecutionTime((int) execRes.runtimeMs);
            
            // 🌟 2. STORE STATUS (Member 2 Deliverable based on Engine Outco)
            if (!execRes.status.equals("SUCCESS")) {
                finalGlobalStatus = execRes.status; // Captures COMPILATION_ERROR, TIME_LIMIT_EXCEEDED, etc.
                res.setPassed(false);
                res.setActualOutput(execRes.error);
                individualResults.add(res);
                break; // Stop evaluating further if catastrophic compiler/timeout error happens
            }

            boolean matches = execRes.output.equals(tc.getExpectedOutput().trim());
            res.setPassed(matches);

            if (matches) {
                passedCount++;
                res.setActualOutput(execRes.output);
            } else {
                finalGlobalStatus = "WRONG_ANSWER";
                res.setActualOutput("Output Mismatch. Expected: [" + tc.getExpectedOutput() + "] Got: [" + execRes.output + "]");
            }
            individualResults.add(res);
        }

        submission.setTotalPassed(passedCount);
        submission.setStatus(finalGlobalStatus); // Sets the verified resource status condition string
        submission.setResults(individualResults);
        
        return submissionRepository.save(submission);
    }

    public List<Submission> getUserSubmissions(Long userId) {
        return submissionRepository.findByUserId(userId);
    }

    public Submission getSubmissionById(Long id) {
        return submissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Submission record not found with id: " + id));
    }
}
