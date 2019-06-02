DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first VARCHAR(255) NOT NULL CHECK (first <> ''),
    last VARCHAR(255) NOT NULL CHECK (last <> ''),
    username VARCHAR(255),
    email TEXT NOT NULL UNIQUE CHECK (email <> ''),
    password VARCHAR(255) NOT NULL,
    bio VARCHAR(300),
    avatar VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
