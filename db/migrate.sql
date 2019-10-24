DROP TABLE IF EXISTS 'users';


CREATE TABLE
IF NOT EXISTS users
(email VARCHAR
(255) PRIMARY KEY NOT NULL,
    firstname VARCHAR
(255) NOT NULL,
    lastname VARCHAR
(255) NOT NULL,
    date VARCHAR
(20) NOT NULL,
    balance INT DEFAULT 0,
    gold INT DEFAULT 0,
    silver INT DEFAULT 0,
    bronze INT DEFAULT 0,
    stone INT DEFAULT 0,
    password VARCHAR
(60) NOT NULL,
    UNIQUE
(email)
);

