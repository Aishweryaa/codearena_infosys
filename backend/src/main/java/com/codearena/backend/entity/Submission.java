package com.codearena.backend.entity;

import com.codearena.backend.enums.Language;
import com.codearena.backend.enums.SubmissionStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "submissions")
@Getter
@Setter
@NoArgsConstructor
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "problem_id", nullable = false)
    private Problem problem;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private Language language;

    @Lob
    @Column(name = "source_code", nullable = false, columnDefinition = "LONGTEXT")
    private String sourceCode;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 40)
    private SubmissionStatus status = SubmissionStatus.PENDING;

    @Column(nullable = false)
    private Integer score = 0;

    @Column(name = "execution_time")
    private Long executionTime;

    @Column(name = "memory_used")
    private Long memoryUsed;

    @Lob
    @Column(name = "compiler_output", columnDefinition = "LONGTEXT")
    private String compilerOutput;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    void beforeInsert() {
        LocalDateTime now = LocalDateTime.now();
        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    void beforeUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
