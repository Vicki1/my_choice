SELECT username,id FROM users 
WHERE (email= $1 AND their_password = $2);