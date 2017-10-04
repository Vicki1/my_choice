


CREATE TABLE IF NOT EXISTS users (
 id SERIAL PRIMARY KEY,
 email varchar(50)  UNIQUE,
 username varchar(25)  UNIQUE,
 their_password varchar(50)  UNIQUE

 );
