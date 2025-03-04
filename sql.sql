CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(500),
  created_at TIMESTAMP DEFAULT current_timestamp
);

-- @block
INSERT INTO users
(full_name)
VALUES
('User 1'),
('Test User 2');