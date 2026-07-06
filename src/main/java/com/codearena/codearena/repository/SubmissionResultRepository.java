package com.codearena.codearena.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.codearena.codearena.model.SubmissionResult;

@Repository
public interface SubmissionResultRepository extends JpaRepository<SubmissionResult, Long> {
}
