-- Drop existing tables
DROP TABLE IF EXISTS books;

-- Create tables
CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  published_date DATE
);