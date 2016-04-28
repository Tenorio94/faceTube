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




INSERT INTO Profile(fName, lName, username, passwrd,email,gender,country)
VALUES ('Maribel','Pastrana','maripastrana','mpastrana123','mary.pastrana@gmail.com','female','Mexico'),
		('Miriam','Pastrana','miripastrana','mpb87','miri.pastrana@gmail.com','female','Mexico'),
		('Santos','Flores','santiagopastrana','spf540126','santiago.pastrana@gmail.com','male','Mexico'),
		('Esther','Pastrana','estherpastrana','mpastranaabc','pastrana@gmail.com','female','Mexico'),
		('Esther','Brito','esther','mpb87','esther@gmail.com','female','Mexico');

INSERT INTO Request(currentUser,askedUser,status)
VALUES ('maripastrana','santiago','P'),
		('maripastrana','miripastrana','A'),
		('santiagopastrana','miripastrana','P');



INSERT INTO Profile(fName, lName, username, passwrd,email,gender,country)
VALUES ('Esther','Pastrana','estherpastrana','mpastranaabc','pastrana@gmail.com','female','Mexico'),
		('Esther','Brito','esther','mpb87','esther@gmail.com','female','Mexico');


select * from Profile where ((username LIKE '%esther%') OR (email LIKE '%eshter%')) 
AND  '%esther%' not in (select askeduser from request where currentUser = 'maripastrana');

INSERT INTO Request(currentUser,askedUser,status)
VALUES ('maripastrana','esther','P');



