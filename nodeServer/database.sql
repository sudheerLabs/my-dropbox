CREATE DATABASE test;

USE test;

CREATE TABLE user_files (
  fileId int(11) NOT NULL AUTO_INCREMENT,
  filename varchar(70) NOT NULL,
  author varchar(20) NOT NULL,
  deleted CHAR DEFAULT 'N',
  starred CHAR DEFAULT 'N',
  filepath varchar(255) NOT NULL,
  rcre_time datetime DEFAULT CURTIME(),
  rmod_time datetime DEFAULT NULL,
  PRIMARY KEY (fileId)
) 


CREATE TABLE `users` (
 `username` varchar(30) NOT NULL,
 `firstname` varchar(255) DEFAULT NULL,
 `lastname` varchar(255) DEFAULT NULL,
 `dateofBirth` date NOT NULL,
 `gender` varchar(6) NOT NULL,
 `city` varchar(500) DEFAULT NULL,
 `mobile` varchar(20) DEFAULT NULL,
 `password` varchar(200) DEFAULT NULL,
 PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1
