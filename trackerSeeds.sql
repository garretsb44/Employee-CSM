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

INSERT INTO products (flavor, price, quantity)
VALUES ("vanilla", 2.50, 100);

INSERT INTO products (flavor, price, quantity)
VALUES ("chocolate", 3.10, 120);

INSERT INTO products (flavor, price, quantity)
VALUES ("strawberry", 3.25, 75);