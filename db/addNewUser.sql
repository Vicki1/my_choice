
INSERT INTO users (email,username,password)
VALUES ($1,$2,$3)
RETURNING *;
-- RETURNING    'after you are done inserting this, return * the entire record, or specify'