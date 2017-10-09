
DELETE FROM videos 
WHERE collection_id = $1;

DELETE FROM collections 
WHERE id = $1;




