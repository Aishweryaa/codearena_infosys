CREATE TABLE problems (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description LONGTEXT NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    category VARCHAR(100) NULL,
    input_format LONGTEXT NULL,
    output_format LONGTEXT NULL,
    constraints_text LONGTEXT NULL,
    sample_input LONGTEXT NULL,
    sample_output LONGTEXT NULL,
    time_limit INT NOT NULL DEFAULT 2000,
    memory_limit INT NOT NULL DEFAULT 256,
    created_by BIGINT NULL,
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT uk_problems_title UNIQUE (title),
    CONSTRAINT fk_problems_created_by
        FOREIGN KEY (created_by) REFERENCES users(id)
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE problem_hints (
    id BIGINT NOT NULL AUTO_INCREMENT,
    problem_id BIGINT NOT NULL,
    hint_text TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 1,
    PRIMARY KEY (id),
    CONSTRAINT fk_problem_hints_problem
        FOREIGN KEY (problem_id) REFERENCES problems(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE test_cases (
    id BIGINT NOT NULL AUTO_INCREMENT,
    problem_id BIGINT NOT NULL,
    input_data LONGTEXT NULL,
    expected_output LONGTEXT NOT NULL,
    is_hidden BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INT NOT NULL DEFAULT 1,
    PRIMARY KEY (id),
    CONSTRAINT fk_test_cases_problem
        FOREIGN KEY (problem_id) REFERENCES problems(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
