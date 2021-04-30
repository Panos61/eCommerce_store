CREATE TABLE IF NOT EXISTS users 
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL
)
