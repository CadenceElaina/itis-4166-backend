-- Drop existing objects to allow re-running the script safely
DROP TABLE IF EXISTS post_categories CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TYPE IF EXISTS user_roles CASCADE;

-- Create ENUM user_roles
CREATE TYPE user_roles AS ENUM ('admin', 'member');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    role user_roles DEFAULT 'member'
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);


-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    post_id INT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);


-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);


-- Create post_categories table
CREATE TABLE IF NOT EXISTS post_categories (
    category_id INT REFERENCES categories(id) ON DELETE CASCADE,
    post_id INT REFERENCES posts(id) ON DELETE CASCADE,
    PRIMARY KEY (category_id, post_id)
);


-- Add data to the users table
INSERT INTO users (name, email, role) VALUES
    ('Alice Admin', 'alice@example.com', 'admin'),
    ('Bob Builder', 'bob@example.com', 'member'),
    ('Carol Coder', 'carol@example.com', 'member'),
    ('Dave Lurker', 'dave@example.com', 'member');  -- Dave has 0 posts


-- Add data to the categories table
INSERT INTO categories (name) VALUES
    ('Database'),
    ('Web Development'),
    ('JavaScript'),
    ('Career');


-- Add data to the posts table
INSERT INTO posts (user_id, title, content) VALUES
    (1, 'Getting Started with PostgreSQL', 'Installing PostgreSQL and creating your first database.'),
    (1, 'Understanding Foreign Keys', 'How ON DELETE CASCADE and ON DELETE SET NULL behave.'),
    (2, 'Building a REST API with Express', 'Routes, controllers, services, and repositories.'),
    (3, 'Async/Await in JavaScript', 'Promises made readable.'),
    (3, 'Preparing for Technical Interviews', 'Practice problems and study habits.');  -- post 5 has 0 comments


-- Add data to the post_categories table
INSERT INTO post_categories (category_id, post_id) VALUES
    (1, 1),
    (1, 2),
    (2, 2),  -- post 2 belongs to multiple categories
    (2, 3),
    (3, 3),
    (3, 4),
    (4, 5);


-- Add data to the comments table
INSERT INTO comments (post_id, user_id, content) VALUES
    (1, 2, 'Helpful walkthrough, thanks!'),
    (1, 3, 'Which version did you install?'),
    (1, 4, 'Worked on Fedora too.'),
    (2, 3, 'The SET NULL example cleared things up.'),
    (2, 4, 'Could you cover composite keys next?'),
    (3, 1, 'Nice separation of layers.'),
    (3, 4, 'Where does validation go?'),
    (4, 2, 'Finally understand await.');
