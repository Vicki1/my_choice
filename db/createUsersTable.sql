
/*DROP TABLE videos;
DROP TABLE collections;
DROP TABLE users;
*/
CREATE TABLE IF NOT EXISTS users (
 id SERIAL PRIMARY KEY,
 email varchar(50)  UNIQUE,
 username varchar(25)  UNIQUE,
 password varchar(50)  UNIQUE

 );
