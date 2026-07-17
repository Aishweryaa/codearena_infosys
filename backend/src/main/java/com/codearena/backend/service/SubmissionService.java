package com.codearena.backend.service;

import com.codearena.backend.dto.LeaderboardResponse;
import com.codearena.backend.dto.SubmissionCreateRequest;
import com.codearena.backend.dto.SubmissionResponse;
import com.codearena.backend.dto.SubmissionResultResponse;
import com.codearena.backend.entity.LeaderboardEntry;
import com.codearena.backend.entity.Problem;
import com.codearena.backend.entity.Submission;
import com.codearena.backend.entity.SubmissionResult;
import com.codearena.backend.entity.TestCase;
import com.codearena.backend.entity.User;
import com.codearena.backend.enums.SubmissionStatus;
import com.codearena.backend.exception.ResourceNotFoundException;
import com.codearena.backend.repository.LeaderboardEntryRepository;
import com.codearena.backend.repository.ProblemRepository;
import com.codearena.backend.repository.SubmissionRepository;
import com.codearena.backend.repository.SubmissionResultRepository;
import com.codearena.backend.repository.TestCaseRepository;
import com.codearena.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class SubmissionService {

    private final UserRepository userRepository;
    private final ProblemRepository problemRepository;
    private final TestCaseRepository testCaseRepository;
    private final SubmissionRepository submissionRepository;
    private final SubmissionResultRepository
            submissionResultRepository;
    private final LeaderboardEntryRepository
            leaderboardEntryRepository;
    private final CodeExecutionService codeExecutionService;

    public SubmissionService(
            UserRepository userRepository,
            ProblemRepository problemRepository,
            TestCaseRepository testCaseRepository,
            SubmissionRepository submissionRepository,
            SubmissionResultRepository
                    submissionResultRepository,
            LeaderboardEntryRepository
                    leaderboardEntryRepository,
            CodeExecutionService codeExecutionService) {

        this.userRepository = userRepository;
        this.problemRepository = problemRepository;
        this.testCaseRepository = testCaseRepository;
        this.submissionRepository = submissionRepository;
        this.submissionResultRepository =
                submissionResultRepository;
        this.leaderboardEntryRepository =
                leaderboardEntryRepository;
        this.codeExecutionService =
                codeExecutionService;
    }

    @Transactional
    public SubmissionResponse createSubmission(
            SubmissionCreateRequest request,
            String authenticatedEmail) {

        User user = findUser(authenticatedEmail);

        Problem problem = problemRepository
                .findById(request.problemId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Problem not found with id: "
                                        + request.problemId()
                        )
                );

        List<TestCase> testCases =
                testCaseRepository
                        .findByProblemIdOrderByDisplayOrderAsc(
                                problem.getId()
                        );

        if (testCases.isEmpty()) {
            throw new IllegalArgumentException(
                    "This problem has no test cases configured"
            );
        }

        Submission submission = new Submission();
        submission.setUser(user);
        submission.setProblem(problem);
        submission.setLanguage(request.language());
        submission.setSourceCode(request.sourceCode());
        submission.setStatus(
                SubmissionStatus.RUNNING
        );
        submission.setScore(0);

        submission =
                submissionRepository.saveAndFlush(
                        submission
                );

        CodeExecutionService.PreparedProgram program =
                codeExecutionService.prepare(
                        request.language(),
                        request.sourceCode(),
                        problem
                );

        if (!program.ready()) {
            submission.setStatus(
                    program.failureStatus()
            );
            submission.setCompilerOutput(
                    program.failureMessage()
            );

            Submission saved =
                    submissionRepository.save(
                            submission
                    );

            updateLeaderboard(user);

            return toResponse(saved, List.of());
        }

        List<SubmissionResult> results =
                new ArrayList<>();

        SubmissionStatus finalStatus =
                SubmissionStatus.ACCEPTED;

        long totalExecutionTime = 0L;

        try {
            for (TestCase testCase : testCases) {
                CodeExecutionService.ExecutionResult
                        execution =
                        codeExecutionService.execute(
                                program,
                                testCase.getInput()
                        );

                totalExecutionTime +=
                        execution.executionTime();

                String actualOutput =
                        execution.output();

                String expectedOutput =
                        testCase.getExpectedOutput();

                SubmissionStatus resultStatus =
                        execution.status();

                boolean passed = false;

                if (
                        resultStatus
                                == SubmissionStatus.ACCEPTED
                ) {
                    passed =
                            codeExecutionService
                                    .normalizeOutput(
                                            actualOutput
                                    )
                                    .equals(
                                            codeExecutionService
                                                    .normalizeOutput(
                                                            expectedOutput
                                                    )
                                    );

                    if (!passed) {
                        resultStatus =
                                SubmissionStatus
                                        .WRONG_ANSWER;
                    }
                }

                SubmissionResult result =
                        new SubmissionResult();

                result.setSubmission(submission);
                result.setTestCase(testCase);
                result.setStatus(resultStatus);
                result.setPassed(passed);
                result.setActualOutput(actualOutput);
                result.setExpectedOutput(
                        expectedOutput
                );
                result.setErrorMessage(
                        execution.errorMessage()
                );
                result.setExecutionTime(
                        execution.executionTime()
                );
                result.setMemoryUsed(null);

                results.add(
                        submissionResultRepository
                                .save(result)
                );

                if (
                        resultStatus
                                != SubmissionStatus.ACCEPTED
                ) {
                    finalStatus = resultStatus;
                    break;
                }
            }
        } finally {
            codeExecutionService.cleanup(program);
        }

        submission.setStatus(finalStatus);
        submission.setExecutionTime(
                totalExecutionTime
        );
        submission.setMemoryUsed(null);
        submission.setScore(
                finalStatus
                        == SubmissionStatus.ACCEPTED
                        ? 100
                        : 0
        );

        Submission savedSubmission =
                submissionRepository.save(submission);

        updateLeaderboard(user);

        return toResponse(
                savedSubmission,
                results
        );
    }

    @Transactional(readOnly = true)
    public List<SubmissionResponse> mySubmissions(
            String authenticatedEmail) {

        User user = findUser(authenticatedEmail);

        return submissionRepository
                .findByUserIdOrderByCreatedAtDesc(
                        user.getId()
                )
                .stream()
                .map(this::toResponseWithResults)
                .toList();
    }

    @Transactional(readOnly = true)
    public SubmissionResponse getSubmission(
            Long submissionId,
            String authenticatedEmail,
            boolean administrator) {

        User user = findUser(authenticatedEmail);

        Submission submission;

        if (administrator) {
            submission =
                    submissionRepository
                            .findById(submissionId)
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Submission not found with id: "
                                                    + submissionId
                                    )
                            );
        } else {
            submission =
                    submissionRepository
                            .findByIdAndUserId(
                                    submissionId,
                                    user.getId()
                            )
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Submission not found with id: "
                                                    + submissionId
                                    )
                            );
        }

        return toResponseWithResults(submission);
    }

    @Transactional(readOnly = true)
    public List<SubmissionResponse> allSubmissions() {

        return submissionRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponseWithResults)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<LeaderboardResponse> leaderboard() {

        List<LeaderboardEntry> entries =
                leaderboardEntryRepository
                        .findAllByOrderByScoreDescProblemsSolvedDescUpdatedAtAsc();

        List<LeaderboardResponse> responses =
                new ArrayList<>();

        long rank = 1;

        for (LeaderboardEntry entry : entries) {
            responses.add(
                    new LeaderboardResponse(
                            rank++,
                            entry.getUser().getId(),
                            entry.getUser().getUsername(),
                            entry.getUser().getEmail(),
                            entry.getProblemsSolved(),
                            entry.getTotalSubmissions(),
                            entry.getAcceptedSubmissions(),
                            entry.getScore()
                    )
            );
        }

        return responses;
    }

    private User findUser(String email) {

        return userRepository
                .findByEmailIgnoreCase(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User account not found"
                        )
                );
    }

    private void updateLeaderboard(User user) {

        int totalSubmissions =
                Math.toIntExact(
                        submissionRepository
                                .countByUserId(
                                        user.getId()
                                )
                );

        int acceptedSubmissions =
                Math.toIntExact(
                        submissionRepository
                                .countByUserIdAndStatus(
                                        user.getId(),
                                        SubmissionStatus
                                                .ACCEPTED
                                )
                );

        int problemsSolved =
                Math.toIntExact(
                        submissionRepository
                                .countDistinctSolvedProblems(
                                        user.getId(),
                                        SubmissionStatus
                                                .ACCEPTED
                                )
                );

        LeaderboardEntry entry =
                leaderboardEntryRepository
                        .findByUserId(user.getId())
                        .orElseGet(() -> {
                            LeaderboardEntry created =
                                    new LeaderboardEntry();

                            created.setUser(user);

                            return created;
                        });

        entry.setTotalSubmissions(
                totalSubmissions
        );
        entry.setAcceptedSubmissions(
                acceptedSubmissions
        );
        entry.setProblemsSolved(
                problemsSolved
        );
        entry.setScore(
                problemsSolved * 100
        );

        leaderboardEntryRepository.save(entry);
    }

    private SubmissionResponse
    toResponseWithResults(
            Submission submission) {

        List<SubmissionResult> results =
                submissionResultRepository
                        .findBySubmissionIdOrderByIdAsc(
                                submission.getId()
                        );

        return toResponse(submission, results);
    }

    private SubmissionResponse toResponse(
            Submission submission,
            List<SubmissionResult> results) {

        return new SubmissionResponse(
                submission.getId(),
                submission.getUser().getId(),
                submission.getUser().getUsername(),
                submission.getProblem().getId(),
                submission.getProblem().getTitle(),
                submission.getLanguage(),
                submission.getSourceCode(),
                submission.getStatus(),
                submission.getScore(),
                submission.getExecutionTime(),
                submission.getMemoryUsed(),
                submission.getCompilerOutput(),
                submission.getCreatedAt(),
                submission.getUpdatedAt(),
                results.stream()
                        .map(this::toResultResponse)
                        .toList()
        );
    }

    private SubmissionResultResponse
    toResultResponse(
            SubmissionResult result) {

        Long testCaseId =
                result.getTestCase() == null
                        ? null
                        : result.getTestCase()
                        .getId();

        return new SubmissionResultResponse(
                result.getId(),
                testCaseId,
                result.getStatus(),
                result.getPassed(),
                result.getActualOutput(),
                result.getExpectedOutput(),
                result.getErrorMessage(),
                result.getExecutionTime(),
                result.getMemoryUsed()
        );
    }
}
