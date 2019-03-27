CREATE DATABASE IF NOT EXISTS nodelogin;
USE nodelogin;

CREATE TABLE IF NOT EXISTS accounts (
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL,
  pasword varchar(255) NOT NULL,
  email varchar(100) NOT NULL,
  PRIMARY KEY (id)
);


INSERT INTO accounts (username, pasword, email) VALUES ('Brenda', '123', 'test@test.com');
INSERT INTO accounts (username, pasword, email) VALUES ('Dani', '321', 'test1@test.com');