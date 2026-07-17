package com.codearena.backend.service;

import com.codearena.backend.dto.AdminDashboardResponse;
import com.codearena.backend.dto.UserDashboardResponse;
import com.codearena.backend.entity.LeaderboardEntry;
import com.codearena.backend.entity.User;
import com.codearena.backend.enums.Role;
import com.codearena.backend.enums.SubmissionStatus;
import com.codearena.backend.exception.ResourceNotFoundException;
import com.codearena.backend.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final ProblemRepository problemRepository;
    private final SubmissionRepository submissionRepository;
    private final LeaderboardEntryRepository leaderboardEntryRepository;

    public DashboardService(
            UserRepository userRepository,
            ProblemRepository problemRepository,
            SubmissionRepository submissionRepository,
            LeaderboardEntryRepository leaderboardEntryRepository) {
        this.userRepository = userRepository;
        this.problemRepository = problemRepository;
        this.submissionRepository = submissionRepository;
        this.leaderboardEntryRepository = leaderboardEntryRepository;
    }

    @Transactional(readOnly = true)
    public UserDashboardResponse userDashboard(String email) {
        User user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResourceNotFoundException("User account not found"));

        LeaderboardEntry entry = leaderboardEntryRepository.findByUserId(user.getId())
                .orElse(null);

        int score = entry == null ? 0 : entry.getScore();
        long rank = entry == null ? 0 : leaderboardEntryRepository.countByScoreGreaterThan(score) + 1;

        return new UserDashboardResponse(
                problemRepository.count(),
                submissionRepository.countByUserId(user.getId()),
                submissionRepository.countByUserIdAndStatus(user.getId(), SubmissionStatus.ACCEPTED),
                submissionRepository.countDistinctSolvedProblems(user.getId(), SubmissionStatus.ACCEPTED),
                rank,
                score
        );
    }

    @Transactional(readOnly = true)
    public AdminDashboardResponse adminDashboard() {
        long admins = userRepository.findAll().stream()
                .filter(user -> user.getRole() == Role.ADMIN)
                .count();

        long users = userRepository.count() - admins;

        return new AdminDashboardResponse(
                userRepository.count(),
                problemRepository.count(),
                submissionRepository.count(),
                submissionRepository.countByStatus(SubmissionStatus.ACCEPTED),
                admins,
                users
        );
    }
}
