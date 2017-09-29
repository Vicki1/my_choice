CREATE TABLE IF NOT EXISTS videos(
 id SERIAL PRIMARY KEY,
 video_id varchar(50),
 collection_id int,
 description varchar(1000),
FOREIGN KEY (collection_id) REFERENCES collections(id)
)