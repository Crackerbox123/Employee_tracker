//* DROP TABLE IF EXISTS departments;
//* DROP TABLE IF EXISTS employeeRoles;
//* DROP TABLE IF EXISTS employee;
//* 
//* CREATE TABLE departments (
//*     id INTEGER AUTO_INCREMENT PRIMARY KEY,
//*     name VARCHAR(30) NOT NULL
//* );
//* 
//* CREATE TABLE employeeRoles (
//* 
//*     id INTEGER AUTO_INCREMENT PRIMARY KEY,
//*     job_title VARCHAR(30) NOT NULL,
//*     salary INTEGER NOT NULL,
//*     department_id INTEGER NOT NULL,
//*     CONSTRAINT fk_depart
//*         FOREIGN KEY (department_id)
//*         REFERENCES departments(id)
//* );
//* 
//* CREATE TABLE employee (
//* 
//*     id INTEGER AUTO_INCREMENT PRIMARY KEY,
//*     first_name VARCHAR(30),
//*     last_name VARCHAR(30)
//* )