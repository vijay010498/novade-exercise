CREATE DATABASE novade;

--\c into novade
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    added VARCHAR(255) NULL,
    author VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
)
