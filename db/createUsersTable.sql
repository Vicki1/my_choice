
CREATE TABLE IF NOT EXISTS users(
 id SERIAL PRIMARY KEY,
profile_id varchar UNIQUE,
 display_name varchar 
);
