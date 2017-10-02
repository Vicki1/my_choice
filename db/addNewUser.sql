
INSERT INTO users (email,username,their_password)
VALUES ($1,$2,$3)
RETURNING id,username;
-- RETURNING    'after you are done inserting this, return * the entire record, or specify'