package com.codearena.backend.entity;

import com.codearena.backend.enums.SubmissionStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "submission_results")
@Getter
@Setter
@NoArgsConstructor
public class SubmissionResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "submission_id", nullable = false)
    private Submission submission;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_case_id")
    private TestCase testCase;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 40)
    private SubmissionStatus status;

    @Column(nullable = false)
    private Boolean passed = false;

    @Lob
    @Column(name = "actual_output", columnDefinition = "LONGTEXT")
    private String actualOutput;

    @Lob
    @Column(name = "expected_output", columnDefinition = "LONGTEXT")
    private String expectedOutput;

    @Lob
    @Column(name = "error_message", columnDefinition = "LONGTEXT")
    private String errorMessage;

    @Column(name = "execution_time")
    private Long executionTime;

    @Column(name = "memory_used")
    private Long memoryUsed;
}
