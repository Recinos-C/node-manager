-- DROP DATABASE IF EXISTS employee_managerDB;-- 

CREATE DATABASE employee_managerDB;

USE employee_managerDB;

CREATE TABLE departments
(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
     manager VARCHAR(30) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE roles
(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE employees
(
	id int NOT NULL AUTO_INCREMENT,
    employee_id INT NOT NULL,
	name VARCHAR(30) NOT NULL,
    role VARCHAR(20) NOT NULL,
    department VARCHAR(20) NOT NULL,
    manager VARCHAR(30) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE managers
(
id int NOT NULL AUTO_INCREMENT,
    employee_id INT NOT NULL,
	name VARCHAR(30) NOT NULL,
    role VARCHAR(20) NOT NULL,
    department VARCHAR(20) NOT NULL,
	PRIMARY KEY (id)
);