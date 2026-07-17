package com.codearena.backend.repository;

import com.codearena.backend.entity.ProblemHint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProblemHintRepository extends JpaRepository<ProblemHint, Long> {
    List<ProblemHint> findByProblemIdOrderByDisplayOrderAsc(Long problemId);
}
