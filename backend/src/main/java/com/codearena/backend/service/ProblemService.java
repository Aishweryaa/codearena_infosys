package com.codearena.backend.service;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.codearena.backend.dto.ProblemRequest;
import com.codearena.backend.dto.ProblemResponse;
import com.codearena.backend.dto.TestCaseRequest;
import com.codearena.backend.dto.TestCaseResponse;
import com.codearena.backend.entity.Problem;
import com.codearena.backend.entity.TestCase;
import com.codearena.backend.entity.User;
import com.codearena.backend.exception.ConflictException;
import com.codearena.backend.exception.ResourceNotFoundException;
import com.codearena.backend.repository.ProblemRepository;
import com.codearena.backend.repository.TestCaseRepository;
import com.codearena.backend.repository.UserRepository;

@Service
public class ProblemService {

    private final ProblemRepository problemRepository;
    private final TestCaseRepository testCaseRepository;
    private final UserRepository userRepository;

    public ProblemService(
            ProblemRepository problemRepository,
            TestCaseRepository testCaseRepository,
            UserRepository userRepository) {

        this.problemRepository = problemRepository;
        this.testCaseRepository = testCaseRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public List<ProblemResponse> getAllProblems() {

        return problemRepository
                .findAll(Sort.by(
                        Sort.Direction.ASC,
                        "id"
                ))
                .stream()
                .map(this::toProblemResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProblemResponse getProblemById(Long problemId) {

        Problem problem = findProblem(problemId);

        return toProblemResponse(problem);
    }

    @Transactional
    public ProblemResponse createProblem(
            ProblemRequest request,
            String adminEmail) {

        String title = request.title().trim();

        if (problemRepository.existsByTitleIgnoreCase(title)) {
            throw new ConflictException(
                    "A problem with this title already exists"
            );
        }

        User admin = userRepository
                .findByEmailIgnoreCase(adminEmail)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Admin user not found"
                        )
                );

        Problem problem = new Problem();

        updateProblemFields(problem, request);

        problem.setCreatedBy(admin);

        Problem savedProblem =
                problemRepository.save(problem);

        return toProblemResponse(savedProblem);
    }

    @Transactional
    public ProblemResponse updateProblem(
            Long problemId,
            ProblemRequest request) {

        Problem problem = findProblem(problemId);

        String title = request.title().trim();

        if (problemRepository
                .existsByTitleIgnoreCaseAndIdNot(
                        title,
                        problemId
                )) {

            throw new ConflictException(
                    "Another problem already uses this title"
            );
        }

        updateProblemFields(problem, request);

        Problem savedProblem =
                problemRepository.save(problem);

        return toProblemResponse(savedProblem);
    }

    @Transactional
    public void deleteProblem(Long problemId) {

        Problem problem = findProblem(problemId);

        problemRepository.delete(problem);
    }

    @Transactional(readOnly = true)
    public List<TestCaseResponse> getTestCases(
            Long problemId,
            boolean includeHidden) {

        findProblem(problemId);

        return testCaseRepository
                .findByProblemIdOrderByDisplayOrderAsc(
                        problemId
                )
                .stream()
                .filter(testCase ->
                        includeHidden ||
                        !Boolean.TRUE.equals(
                                testCase.getHidden()
                        )
                )
                .map(this::toTestCaseResponse)
                .toList();
    }

    @Transactional
    public TestCaseResponse createTestCase(
            Long problemId,
            TestCaseRequest request) {

        Problem problem = findProblem(problemId);

        TestCase testCase = new TestCase();

        testCase.setProblem(problem);
        testCase.setInput(request.input());
        testCase.setExpectedOutput(
                request.expectedOutput()
        );

        testCase.setHidden(
                request.hidden() != null
                        ? request.hidden()
                        : false
        );

        if (request.displayOrder() != null) {
            testCase.setDisplayOrder(
                    request.displayOrder()
            );
        } else {
            int nextOrder =
                    testCaseRepository
                            .findByProblemIdOrderByDisplayOrderAsc(
                                    problemId
                            )
                            .size() + 1;

            testCase.setDisplayOrder(nextOrder);
        }

        TestCase savedTestCase =
                testCaseRepository.save(testCase);

        return toTestCaseResponse(savedTestCase);
    }

    private Problem findProblem(Long problemId) {

        return problemRepository
                .findById(problemId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Problem not found with id: "
                                        + problemId
                        )
                );
    }

    private void updateProblemFields(
            Problem problem,
            ProblemRequest request) {

        problem.setTitle(request.title().trim());
        problem.setDescription(
                request.description().trim()
        );
        problem.setDifficulty(
                request.difficulty()
        );
        problem.setCategory(
                emptyToNull(request.category())
        );
        problem.setInputFormat(
                emptyToNull(request.inputFormat())
        );
        problem.setOutputFormat(
                emptyToNull(request.outputFormat())
        );
        problem.setConstraints(
                emptyToNull(request.constraints())
        );
        problem.setSampleInput(
                emptyToNull(request.sampleInput())
        );
        problem.setSampleOutput(
                emptyToNull(request.sampleOutput())
        );
        problem.setTimeLimit(
                request.timeLimit()
        );
        problem.setMemoryLimit(
                request.memoryLimit()
        );
    }

    private ProblemResponse toProblemResponse(
            Problem problem) {

        String creatorName = null;

        if (problem.getCreatedBy() != null) {
            creatorName =
                    problem.getCreatedBy()
                            .getUsername();
        }

        return new ProblemResponse(
                problem.getId(),
                problem.getTitle(),
                problem.getDescription(),
                problem.getDifficulty(),
                problem.getCategory(),
                problem.getInputFormat(),
                problem.getOutputFormat(),
                problem.getConstraints(),
                problem.getSampleInput(),
                problem.getSampleOutput(),
                problem.getTimeLimit(),
                problem.getMemoryLimit(),
                creatorName,
                problem.getCreatedAt(),
                problem.getUpdatedAt()
        );
    }

    private TestCaseResponse toTestCaseResponse(
            TestCase testCase) {

        return new TestCaseResponse(
                testCase.getId(),
                testCase.getProblem().getId(),
                testCase.getInput(),
                testCase.getExpectedOutput(),
                testCase.getHidden(),
                testCase.getDisplayOrder()
        );
    }

    private String emptyToNull(String value) {

        if (value == null || value.isBlank()) {
            return null;
        }

        return value.trim();
    }
}