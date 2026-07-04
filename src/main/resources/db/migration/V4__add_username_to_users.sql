-- Handled by Hibernate live patch
ALTER TABLE users ADD COLUMN username VARCHAR(255) NOT NULL UNIQUE;
