INSERT INTO videos (video_id,collection_id,description)
VALUES ($1,$2,$3)
RETURNING video_id,collection_id,description;