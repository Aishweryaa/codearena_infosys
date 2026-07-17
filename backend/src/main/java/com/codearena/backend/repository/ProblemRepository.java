package com.codearena.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codearena.backend.entity.Problem;

public interface ProblemRepository
        extends JpaRepository<Problem, Long> {

    boolean existsByTitleIgnoreCase(String title);

    boolean existsByTitleIgnoreCaseAndIdNot(
            String title,
            Long id
    );
}