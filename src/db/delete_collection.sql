DELETE * FROM videos
    WHERE user_id=$1
    AND collection_name=$2