CREATE TABLE VIDEOS(
 id int AUTO_INCREMENT
 video_id int
 user_id int
 collection_name varchar(25)
 order_within_collection int
video_description varchar(400)
PRIMARY KEY (id)
FOREIGN KEY(user_id) REFERENCES users(user_id)
)