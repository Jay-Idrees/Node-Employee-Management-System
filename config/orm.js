// Object relational Mapper

//Execution requirements: sql connection, inquirer, util, table
const connection=require('./connect-sql')
const util=require('util')
const inquirer=require('inquirer')
// Notice that I do not need to transfrom console.table requirement into a table
require('console.table')

// I am using util package so I can use the promisify feature to convert responses using a callback function to  responses in a promise object and avoid callback nesting and callback hell- it also allows using async await. Generally speaking, this will ensure that untill a mySQL query response has been generated per expectations no further actions are taken, and if there is an error for some reason, that can be detected- it will help us locate that error

const query= util.promisify(connection.query).bind(connection);

const orm={

    // Creating functions as objects inside the orm object

    // 1) show_employee_all function object
    show_employees_all: async function(){
        const employees_all=await query(

        `SELECT 
            employee.id as ID, 
            CONCAT (employee.first_name, ' ', employee.last_name) AS 'Employee Name', 
            role.title as Title,
            department.name AS Department, 
            CONCAT('$ ',FORMAT(role.salary , 2)," ") AS Salary, 
            CONCAT(e_tablecopy.first_name, " ", e_tablecopy.last_name) AS Manager

        FROM employee 

            INNER JOIN role ON employee.role_id = role.id

            INNER JOIN department ON role.department_id = department.id

            LEFT JOIN employee e_tablecopy ON employee.manager_id = e_tablecopy.id
            ORDER BY id;`);

        // In the code above :
            //the inner join role is fetching role description column from the role table using roleid
        // the inner join fetches department description in a similar fashion
        // the left join- I want to copy information from the same atable as the manager itself is an employee - as I cannot merge the same table with itself- so I make a copy of the table and then merge using the ids

            console.table(employees_all)

    }, // br close show-employees-all async function

      show_employees_bymanager: async function (){
          const employees_bymanager= await query(

          );

      }, // br close bymanager function





}// br clsoe for orm

module.exports=orm