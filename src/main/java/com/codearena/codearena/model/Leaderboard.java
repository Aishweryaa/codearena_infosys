package com.codearena.codearena.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "leaderboard_entries")
public class Leaderboard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "userId")
    private Long userId;

    @Column(name = "problemsSolved")
    private Integer problemsSolved;

    private Double accuracy;

    @Column(name = "user_rank")
    private Integer rank;

    public Leaderboard() {
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public Integer getProblemsSolved() {
        return problemsSolved;
    }

    public Double getAccuracy() {
        return accuracy;
    }

    public Integer getRank() {
        return rank;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setProblemsSolved(Integer problemsSolved) {
        this.problemsSolved = problemsSolved;
    }

    public void setAccuracy(Double accuracy) {
        this.accuracy = accuracy;
    }

    public void setRank(Integer rank) {
        this.rank = rank;
    }
}