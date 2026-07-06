package com.codearena.codearena.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query; // Added missing import
import org.springframework.stereotype.Repository;
import com.codearena.codearena.model.Submission;
import java.util.List;
import java.util.Map; // Added missing import

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByUserId(Long userId);

    // 🌟 Database query to generate leaderboard data
    @Query("SELECT s.userId as userId, COUNT(DISTINCT s.problem.id) as solvedCount " +
           "FROM Submission s WHERE s.status = 'ACCEPTED' " +
           "GROUP BY s.userId ORDER BY solvedCount DESC")
    List<Map<String, Object>> getLeaderboardData();
}
