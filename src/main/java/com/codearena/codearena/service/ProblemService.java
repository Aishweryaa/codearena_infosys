package com.codearena.codearena.service;

import org.springframework.stereotype.Service;

import com.codearena.codearena.dto.ProblemRequest;
import com.codearena.codearena.model.Problem;
import com.codearena.codearena.model.TestCase; // Added missing import
import com.codearena.codearena.repository.ProblemRepository;
import com.codearena.codearena.repository.TestCaseRepository; // Added missing import
import java.util.List;

@Service
public class ProblemService {

    private final ProblemRepository problemRepository;
    private final TestCaseRepository testCaseRepository; // Added final field

    // Updated constructor to inject both repositories natively
    public ProblemService(ProblemRepository problemRepository, TestCaseRepository testCaseRepository) {
        this.problemRepository = problemRepository;
        this.testCaseRepository = testCaseRepository;
    }

    // 1. Create Problem
    public Problem createProblem(ProblemRequest request) {
        Problem problem = new Problem();

        problem.setTitle(request.getTitle());
        problem.setDescriptionMd(request.getDescriptionMd());
        problem.setDifficulty(request.getDifficulty());
        problem.setTags(request.getTags());

        return problemRepository.save(problem);
    }

    // 2. View All Problems
    public List<Problem> getAllProblems() {
        return problemRepository.findAll();
    }

    // 🌟 3. Get Single Problem by ID
    public Problem getProblemById(Long id) {
        return problemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Problem not found with id: " + id));
    }

    // 🌟 4. Update Existing Problem
    public Problem updateProblem(Long id, ProblemRequest request) {
        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Problem not found with id: " + id));
        
        problem.setTitle(request.getTitle());
        problem.setDescriptionMd(request.getDescriptionMd());
        problem.setDifficulty(request.getDifficulty());
        problem.setTags(request.getTags());
        
        return problemRepository.save(problem);
    }

    // 🌟 5. Delete Problem
    public void deleteProblem(Long id) {
        Problem problem = problemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Problem not found with id: " + id));
        problemRepository.delete(problem);
    }

    // 📥 6. Add Test Case to a Problem
    public TestCase addTestCase(Long problemId, TestCase testCase) {
        problemRepository.findById(problemId)
                .orElseThrow(() -> new RuntimeException("Problem not found with id: " + problemId));
        
        testCase.setProblemId(problemId);
        return testCaseRepository.save(testCase);
    }

    // 📤 7. Get All Test Cases for a Problem
    public List<TestCase> getTestCasesForProblem(Long problemId) {
        return testCaseRepository.findByProblemId(problemId);
    }
}
