package com.codearena.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "problem_hints")
@Getter
@Setter
@NoArgsConstructor
public class ProblemHint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "problem_id", nullable = false)
    private Problem problem;

    @Lob
    @Column(name = "hint_text", nullable = false, columnDefinition = "TEXT")
    private String hintText;

    @Column(name = "display_order", nullable = false)
    private Integer displayOrder = 1;
}
