DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id serial PRIMARY KEY,
    username varchar(255) NOT NULL,
    score int NOT NULL
);

INSERT INTO users (id, username, score) 
VALUES
(1,'Goku', 10 ),
(2, 'Majin Buu', 4 ),
(3, 'Freezer', 2 );
