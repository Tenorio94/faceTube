Create Database faceTube; 
use faceTube;

CREATE TABLE Profile (
	fName VARCHAR(30) NOT NULL,
    lName VARCHAR(30) NOT NULL,
    username VARCHAR(50) NOT NULL PRIMARY KEY,
    passwrd VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL, 
    gender VARCHAR(10) NOT NULL, 
    country VARCHAR(30) NOT NULL
);


CREATE TABLE Video(
	username VARCHAR(30) NOT NULL,
	title VARCHAR(30) NOT NULL, 
	idVideo INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	rating INT NOT NULL,
	linkVideo VARCHAR(100) NOT NULL,
	FOREIGN KEY (username) REFERENCES Profile (username)

);

CREATE TABLE Request(
	currentUser VARCHAR(50),
	askedUser VARCHAR(50),
	status VARCHAR(10), 
	FOREIGN KEY (currentUser) REFERENCES Profile (username)

);

CREATE TABLE User(
	username VARCHAR(50),
	idVideo INT NOT NULL,
	FOREIGN KEY (username) REFERENCES Profile (username),
	FOREIGN KEY (idVideo) REFERENCES Video (idVideo)
);
