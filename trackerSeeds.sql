DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE department (
  id INT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  department_id INT NOT NULL
);

CREATE TABLE employee (
  id INT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL
);

INSERT INTO department (name)
VALUES ("Sales"),("Legal"),("Engineering"),("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES ("Salesmen", 50000, 1),("Typer",30000,2),("Engineer", 70000, 3),("Agent",45000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tim","Stevens", 1, null),("Stacy","Adams", 2, null),("Mike","Jones", 3, null),("Jessica", "Johnson", 4, null);