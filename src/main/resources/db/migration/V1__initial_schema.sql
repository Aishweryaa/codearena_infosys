CREATE TABLE problems (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    descriptionMd TEXT,
    difficulty VARCHAR(255),
    tags VARCHAR(255)
);

CREATE TABLE test_cases (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    problemId BIGINT,
    input TEXT,
    expectedOutput TEXT,
    hidden BOOLEAN,
    timeLimitOverride INT
);

CREATE TABLE leaderboard_entries (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    userId BIGINT,
    problemsSolved INT,
    accuracy DOUBLE,
    user_rank INT
);