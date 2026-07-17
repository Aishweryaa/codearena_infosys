package com.codearena.backend.entity;

import com.codearena.backend.enums.Difficulty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "problems")
@Getter
@Setter
@NoArgsConstructor
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 200)
    private String title;

    @Lob
    @Column(nullable = false, columnDefinition = "LONGTEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Difficulty difficulty;

    @Column(length = 100)
    private String category;

    @Lob
    @Column(name = "input_format", columnDefinition = "LONGTEXT")
    private String inputFormat;

    @Lob
    @Column(name = "output_format", columnDefinition = "LONGTEXT")
    private String outputFormat;

    @Lob
    @Column(name = "constraints_text", columnDefinition = "LONGTEXT")
    private String constraints;

    @Lob
    @Column(name = "sample_input", columnDefinition = "LONGTEXT")
    private String sampleInput;

    @Lob
    @Column(name = "sample_output", columnDefinition = "LONGTEXT")
    private String sampleOutput;

    @Column(name = "time_limit", nullable = false)
    private Integer timeLimit = 2000;

    @Column(name = "memory_limit", nullable = false)
    private Integer memoryLimit = 256;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

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
