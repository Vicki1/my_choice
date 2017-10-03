INSERT INTO collections (user_id,collection_name)
VALUES ($1,$2)
RETURNING collection_name;