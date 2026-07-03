package com.codearena.codearena.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "test_cases")
public class TestCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "problemId")
    private Long problemId;

    @Column(columnDefinition = "TEXT")
    private String input;

    @Column(name = "expectedOutput", columnDefinition = "TEXT")
    private String expectedOutput;

    private Boolean hidden;

    @Column(name = "timeLimitOverride")
    private Integer timeLimitOverride;

    public TestCase() {
    }

    public Long getId() {
        return id;
    }

    public Long getProblemId() {
        return problemId;
    }

    public String getInput() {
        return input;
    }

    public String getExpectedOutput() {
        return expectedOutput;
    }

    public Boolean getHidden() {
        return hidden;
    }

    public Integer getTimeLimitOverride() {
        return timeLimitOverride;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setProblemId(Long problemId) {
        this.problemId = problemId;
    }

    public void setInput(String input) {
        this.input = input;
    }

    public void setExpectedOutput(String expectedOutput) {
        this.expectedOutput = expectedOutput;
    }

    public void setHidden(Boolean hidden) {
        this.hidden = hidden;
    }

    public void setTimeLimitOverride(Integer timeLimitOverride) {
        this.timeLimitOverride = timeLimitOverride;
    }
}