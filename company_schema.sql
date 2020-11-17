
-- Initialization commands for setting up teh company database of employees
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;




CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY(id),
    -- Below are the variables created to facilitate linking
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
    
);

CREATE TABLE role (

	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL UNIQUE,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);


CREATE TABLE department(
    -- Setting up variables id, name
id INT NOT NUL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
-- Specifying that the id is unique per record
PRIMARY KEY(id)

);