In this assignment, you will continue building the blogging database. In the demo videos, you have already seen how to create the ER diagram and how to implement the users table. Your task is to complete the schema, populate the database with sample data, and write SQL queries to explore the database.

Part A: Table Creation and Data Population

1. Download the starter codeDownload starter code, which includes statements to create the ENUM type and the users tables.

2. Write SQL statements to create each of the following tables

   posts

   comments

   categories

   post_categories

ER-Diagram.png

Schema Constraint Requirements:

    Execution Order: Ensure tables are created in logical dependency order (create parent tables before child tables that reference them).

    ERD Alignment: Table names, column names, foreign key constraints, and data types must match the provided ER diagram exactly.

    Foreign Key Rules: Implement foreign key relationships to match the ER diagram, ensuring proper deletion behavior when parent records are removed

        User Deletion: If a user account is deleted, their posts and comments must remain in the database, but their reference fields (posts.user_id and comments.user_id) must automatically be set to NULL. (Note: Ensure these foreign key columns allow NULL values).

        Post Deletion: If a post is deleted, all comments belonging to that post and all entries linking that post to categories in post_categories must be automatically removed.

        Category Deletion: If a category is deleted, all corresponding mapping records in post_categories must be automatically removed, but the underlying posts must remain intact.

    Timestamp & Defaults: For any column representing a timestamp or creation date (created_at), use the TIMESTAMPTZ data type and set the default value to CURRENT_TIMESTAMP.

    Unique Constraints: The name column in the categories table must be set to UNIQUE.

3. Write INSERT INTO statements to populate your database with seed data. Your dataset must meet or exceed the following revised requirements:

    At least 4 Users
        Condition: At least 1 user must have 0 posts

    At least 4 Categories
        Condition: One of the categories must be named 'Database'

    At least 5 Posts
        Condition:
            At least 1 post title must contain the phrase 'PostgreSQL'.
            Every post must belong to at least one category
            At least 1 post must belong to multiple categories
            At least 1 post must have 0 comments

    At least 8 Comments
        Condition: At least 1 comment must contain the word 'Helpful'

Part B: SQL Queries

When grading Part B, the autograder will execute your queries against a standardized grading dataset (not your Part A seed data). Ensure your queries strictly follow the instructions, schema definitions, alias names, and sorting rules so they work across any dataset.

1. Download the starter codeDownload starter code.

2. Write SQL queries to complete the following tasks:

1) List all posts along with the author’s name and email address.

   Columns to return (in exact order):

        id: Post ID

        title: Post title

        author_name: Author's name

        author_email: Author's email

   Sorting: Sort by post id in ascending order.

2) Write a query to find all posts that currently have no categories assigned to them.

   Columns to return (in exact order):

        id: Post ID

        title: Post title

        created_at: Post creation timestamp

   Sorting: Sort by created_at in descending order (newest first).

3) Find all posts that have received 2 or more comments.

   Columns to return (in exact order):

        id: Post ID

        title: Post title
        total_comments: Total number of comments on the post

   Hint: Join posts and comments, group by post, and filter the aggregated counts using a HAVING clause.

   Sorting: Sort by total_comments in descending order, then by post title alphabetically to break ties.

4) Calculate the total number of comments received across all posts written by each user.

   Columns to return (in exact order):

        id: User ID

        name: User's name

        total_received_comments: Total comments received across all of the author's posts

   Hint: Join users to posts to comments. You must include all users in the system, even if they have 0 posts or their posts have 0 comments (their count should be 0). Use COUNT(comments.id) rather than COUNT(*) to ensure missing records evaluate to 0.

   Sorting: Sort by total_received_comments in descending order, then by user name alphabetically to break ties.
   Submit only the following two files to Gradescope:

        parta.sql

        partb.sql

   Make sure all file names are exactly correct. Incorrect file names may cause the autograder to fail.

   Automated Cooldown: Gradescope enforces a mandatory 5-minute cooldown window between consecutive submissions. Submissions attempted during an active cooldown will be blocked by the system.

   Submit Early: Running out of time due to active cooldown windows will not be accepted as a reason for extensions or late submissions.
