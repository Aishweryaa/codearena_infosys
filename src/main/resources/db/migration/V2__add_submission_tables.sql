CREATE TABLE submissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    problem_id BIGINT,
    user_id BIGINT,
    source_code TEXT,
    language VARCHAR(50),
    status VARCHAR(50),
    total_passed INT,
    total_test_cases INT,
    submitted_at TIMESTAMP,

    CONSTRAINT fk_submission_problem
        FOREIGN KEY (problem_id)
        REFERENCES problems(id)
);

CREATE TABLE submission_results (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    submission_id BIGINT,
    test_case_id BIGINT,
    passed BOOLEAN,
    execution_time INT,
    actual_output TEXT,

    CONSTRAINT fk_result_submission
        FOREIGN KEY (submission_id)
        REFERENCES submissions(id),

    CONSTRAINT fk_result_testcase
        FOREIGN KEY (test_case_id)
        REFERENCES test_cases(id)
);