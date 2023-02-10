-- Deletes the database if exists
DROP DATABASE IF EXISTS empolyees_db;

-- creates new db
CREATE DATABASE empolyees_db;

USE empolyees_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
)

CREATE TABLE role (
    id INT NOT NULL 
    tittle VARCHAR(30)
    salary DECIMAL
    department

)