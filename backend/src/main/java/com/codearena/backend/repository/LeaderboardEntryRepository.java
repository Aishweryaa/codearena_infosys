package com.codearena.backend.repository;

import com.codearena.backend.entity.LeaderboardEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LeaderboardEntryRepository extends JpaRepository<LeaderboardEntry, Long> {
    Optional<LeaderboardEntry> findByUserId(Long userId);
    long countByScoreGreaterThan(Integer score);
}
