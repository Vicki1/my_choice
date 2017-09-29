SELECT 
users.id,
users.user_id,
users.email,
collections.id as collection_id,
collections.collection_name,
videos.id as video_table_id,
videos.video_id
FROM users
JOIN collections ON users.id = collections.user_id
JOIN videos ON collections.id = videos.collection_id