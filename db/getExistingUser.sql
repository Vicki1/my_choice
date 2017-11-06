SELECT id,display_name FROM users 
WHERE (profile_id= $1 AND display_name = $2);