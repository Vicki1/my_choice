
INSERT INTO users (profile_id,display_name)
VALUES ($1,$2)
RETURNING id,display_name;
-- RETURNING    'after you are done inserting this, return * the entire record, or specify'