-- 1) All posts with the author's name and email
SELECT
    posts.id,
    posts.title,
    users.name AS author_name,
    users.email AS author_email
FROM posts
LEFT JOIN users ON users.id = posts.user_id
ORDER BY posts.id ASC;

-- 2) Posts with no categories assigned
SELECT
    posts.id,
    posts.title,
    posts.created_at
FROM posts
LEFT JOIN post_categories ON post_categories.post_id = posts.id
WHERE post_categories.post_id IS NULL
ORDER BY posts.created_at DESC;

-- 3) Posts with 2 or more comments
SELECT
    posts.id,
    posts.title,
    COUNT(comments.id) AS total_comments
FROM posts
JOIN comments ON comments.post_id = posts.id
GROUP BY posts.id, posts.title
HAVING COUNT(comments.id) >= 2
ORDER BY total_comments DESC, posts.title ASC;

-- 4) Total comments received across each user's posts
SELECT
    users.id,
    users.name,
    COUNT(comments.id) AS total_received_comments
FROM users
LEFT JOIN posts ON posts.user_id = users.id
LEFT JOIN comments ON comments.post_id = posts.id
GROUP BY users.id, users.name
ORDER BY total_received_comments DESC, users.name ASC;
