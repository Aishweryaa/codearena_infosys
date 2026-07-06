package com.codearena.codearena.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.codearena.codearena.model.Problem;

public interface ProblemRepository extends JpaRepository<Problem, Long> {

}