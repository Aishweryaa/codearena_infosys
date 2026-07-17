CREATE TABLE submissions (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    problem_id BIGINT NOT NULL,
    language VARCHAR(30) NOT NULL,
    source_code LONGTEXT NOT NULL,
    status VARCHAR(40) NOT NULL DEFAULT 'PENDING',
    score INT NOT NULL DEFAULT 0,
    execution_time BIGINT NULL,
    memory_used BIGINT NULL,
    compiler_output LONGTEXT NULL,
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6) NOT NULL,
    PRIMARY KEY (id),
    INDEX idx_submissions_user (user_id),
    INDEX idx_submissions_problem (problem_id),
    INDEX idx_submissions_status (status),
    CONSTRAINT fk_submissions_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_submissions_problem
        FOREIGN KEY (problem_id) REFERENCES problems(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE submission_results (
    id BIGINT NOT NULL AUTO_INCREMENT,
    submission_id BIGINT NOT NULL,
    test_case_id BIGINT NULL,
    status VARCHAR(40) NOT NULL,
    passed BOOLEAN NOT NULL DEFAULT FALSE,
    actual_output LONGTEXT NULL,
    expected_output LONGTEXT NULL,
    error_message LONGTEXT NULL,
    execution_time BIGINT NULL,
    memory_used BIGINT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_submission_results_submission
        FOREIGN KEY (submission_id) REFERENCES submissions(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_submission_results_test_case
        FOREIGN KEY (test_case_id) REFERENCES test_cases(id)
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE leaderboard_entries (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    problems_solved INT NOT NULL DEFAULT 0,
    total_submissions INT NOT NULL DEFAULT 0,
    accepted_submissions INT NOT NULL DEFAULT 0,
    score INT NOT NULL DEFAULT 0,
    updated_at DATETIME(6) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uk_leaderboard_user UNIQUE (user_id),
    CONSTRAINT fk_leaderboard_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
