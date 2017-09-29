CREATE TABLE IF NOT EXISTS collections(
 id SERIAL PRIMARY KEY,
 user_id int,
 collection_name varchar(25),
FOREIGN KEY(user_id) REFERENCES users(id)
)