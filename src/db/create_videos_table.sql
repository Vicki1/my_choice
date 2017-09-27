CREATE TABLE VIDEOS(
 id SERIAL PRIMARY KEY
 video_id int
 user_id int
 collection_name varchar(25)
 order_within_collection int
video_description varchar(400)
FOREIGN KEY(user_id) REFERENCES users(user_id)
)