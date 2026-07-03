-- 1. Update leaderboard_entries
ALTER TABLE leaderboard_entries ADD COLUMN problems_solved INT;
ALTER TABLE leaderboard_entries ADD COLUMN user_id BIGINT;

-- 2. Update problems
ALTER TABLE problems ADD COLUMN description_md TEXT;

-- 3. Update submissions
ALTER TABLE submissions MODIFY COLUMN language VARCHAR(255);
ALTER TABLE submissions MODIFY COLUMN status VARCHAR(255);

-- 4. Update test_cases
ALTER TABLE test_cases ADD COLUMN expected_output TEXT;
ALTER TABLE test_cases ADD COLUMN problem_id BIGINT;
ALTER TABLE test_cases ADD COLUMN time_limit_override INT;

-- 5. Create users table
CREATE TABLE users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM ('ADMIN','USER'),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

-- 6. Add Unique Constraint to users
ALTER TABLE users ADD CONSTRAINT UK_users_email UNIQUE (email);
