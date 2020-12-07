# Node Employee Management System

## About the Project
This project is a command line interface application that is designed for a company to manage its employee databases. It provides options to add a new employee, add specific employee information according to the role, etc. The employee information is stored in tables in MYSQL database. The user also has the flexibility to update records and can search for employee records in order to obtain information regarding an employee's salary, department etc. I developed this application during the seventh week of the coding bootcamp at Columbia University, NY. Date of publication: 11/03/2020

[Watch a video demonstrating the app functionality](https://youtu.be/XO_6Aczd0DY)<br />

## Contact Programmer for questions

Jay J. Idrees, MD, MPH<br />
Full-Stack Software Engineer<br />
[JIDREES](https://github.com/Jay-Idrees) ![Github](http://img.shields.io/badge/github-black?style=flat&logo=github)<br />
jidrees@live.com



## Contents

- [User Story](#user-story)
- [Technologies used](#technologies-used)
- [Key files in the repository](#key-files-in-the-repository)
- [Packages used](#packages-used)
- [Applied Programming Skills](#applied-programming-skills)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [License](#license)
- [Credits and Copyright](#credits-and-copyright)


## User Story

I am the chairman of  the darparment of surgery at the University of Rochester and I would like to keep a track of all my employees. I want to be able to create a database of all of my employees. I want an app that can enable me to add new employee information. It should have added functionality to review infomation about employee's role, manager and salary.  This app should also allow updating existing records and deleting old records of employees as deemed necessary.
 



## Technologies used

![Node](https://img.shields.io/badge/Node-green?style=for-the-badge&logo=Node.js)

![Javascript](https://img.shields.io/badge/JavaScript-black?style=for-the-badge&logo=JavaScript)

![NPM](http://img.shields.io/badge/npm-yellow?style=for-the-badge&logo=NPM)

![SQL](https://img.shields.io/badge/MYSQL-darkblue?style=for-the-badge&logo=sqlite)




## Packages used

Inquirer <br />
Console.table <br />
MYSQL 

## Applied Programming Skills

By completing this project I was able to master application of the following programming skills: 

- Using backend web-developement technology including Node.JS packages (MYSQL, Inquirer, console.table)  and creation of MYSQL database

- Using seeds to pre-populate the MYSQL database tables

- Building MYSQL queries to perform CRUD (Create, Read, Update, Delete) operations in MYSQL database

- Using MYSQL Node.JS package to connect to the MYSQL database and performing queries

- Using the Node.JS package Console.table to print MYSQL rows in the form of tables when runnig the app 

- Using inquirer package to collect new information when adding an employee and capturing user data into variables to be passed onto functions

- Using Object Relational Mapping (ORM) to target specfic CRUD operation functions in MYSQL

- Using the Case Switch method in Javascript by linking it to inquirer and triggering functions to perform CRUD operations and performing relevant queries on MYSQL database. For example if the user wants to add a new employee. The Inquirer will help select that option via a terminal prompt and then new information typed by the user is captured into variables and passed into functions generating queries for inserting this new data into MYSQL.

- Joining/Merging tables in MYSQL database using queries to perfrom inner join, left join and right join. E-g, displaying complete employee information my merging employee and role tables to display employee name, salary etc while using employee id as primary/foreign key

- Merging a MYSQL table with itself. This means making a copy of an existing table, creating a new column and merging this new column with the original table. E-g. In this app for example, both managers and employees are included in the employee's table as they are all employees. So in order to create a new column to display the managers for each of the employees (that are not managers) a copy of the employee table is created and then a new column displaying manager for each employee is created using a MYSQL query. This new intermediary table is then merged with the original table

- Using concatination to display complete name by combining first name and last name variables

- Using string interpolation for enabling use of Javascript variables as plugins for the MYSQL queries

- Formatting salary using the FORMAT command in MYSQL with $ and comma separation for significant figures

- Mastery over the MYSQL query commands SELECT, CONCAT, FROM, GROUP BY, WHERE, INSERT INTO, DELETE FROM, ORDER BY, INNER JOIN, LEFT JOIN, RIGHT JOIN

- Using Node.JS to create a high quality readme file



## Key files in the repository

run.js <br />
orm.js 


## Installation

For installation of the dependencies, please run the following command in the terminal

```
npm install
```

## Usage

To start the application, please type the following command in the terminal

```
npm run.js
```


## Testing

For running the tests on application, please run the following commad

```
npm test
```


## License 

![License badge](https://img.shields.io/badge/license-MIT-blue.svg)


## Credits and Copyright 
Copytight 2020- Present. Jay Idrees


