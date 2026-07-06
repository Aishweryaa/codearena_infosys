package com.codearena.codearena.service;

import org.springframework.stereotype.Service;
import com.codearena.codearena.repository.SubmissionRepository;
import java.util.List;
import java.util.Map;

@Service
public class LeaderboardService {

    private final SubmissionRepository submissionRepository;

    public LeaderboardService(SubmissionRepository submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    // Fetches and formats the ranking data from the repository
    public List<Map<String, Object>> getGlobalLeaderboard() {
        return submissionRepository.getLeaderboardData();
    }
}
