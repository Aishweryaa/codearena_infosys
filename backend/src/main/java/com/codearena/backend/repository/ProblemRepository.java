package com.codearena.backend.repository;

import com.codearena.backend.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProblemRepository extends JpaRepository<Problem, Long> {
    boolean existsByTitleIgnoreCase(String title);
}
