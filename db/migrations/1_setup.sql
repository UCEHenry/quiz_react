DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id serial PRIMARY KEY,
    username varchar(255) NOT NULL,
    score int 
);

