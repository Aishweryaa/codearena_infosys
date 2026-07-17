package com.codearena.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "leaderboard_entries")
@Getter
@Setter
@NoArgsConstructor
public class LeaderboardEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "problems_solved", nullable = false)
    private Integer problemsSolved = 0;

    @Column(name = "total_submissions", nullable = false)
    private Integer totalSubmissions = 0;

    @Column(name = "accepted_submissions", nullable = false)
    private Integer acceptedSubmissions = 0;

    @Column(nullable = false)
    private Integer score = 0;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    void beforeSave() {
        updatedAt = LocalDateTime.now();
    }
}
