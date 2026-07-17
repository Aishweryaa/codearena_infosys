package com.codearena.backend.repository;

import com.codearena.backend.entity.Submission;
import com.codearena.backend.enums.SubmissionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {

    long countByUserId(Long userId);

    long countByUserIdAndStatus(
            Long userId,
            SubmissionStatus status
    );

    long countByStatus(SubmissionStatus status);

    List<Submission> findByUserIdOrderByCreatedAtDesc(
            Long userId
    );

    List<Submission> findAllByOrderByCreatedAtDesc();

    Optional<Submission> findByIdAndUserId(
            Long submissionId,
            Long userId
    );

    @Query("""
            select count(distinct s.problem.id)
            from Submission s
            where s.user.id = :userId
              and s.status = :status
            """)
    long countDistinctSolvedProblems(
            @Param("userId") Long userId,
            @Param("status") SubmissionStatus status
    );
}
