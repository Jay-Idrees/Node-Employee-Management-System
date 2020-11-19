// Object relational Mapper

//Execution requirements: sql connection, inquirer, util, table
const connection=require('./connect-sql')
const util=require('util')
const inquirer=require('inquirer')
// Notice that I do not need to transfrom console.table requirement into a table
require('console.table')

// I am using util package so I can use the promisify feature to convert responses using a callback function to  responses in a promise object and avoid callback nesting and callback hell- it also allows using async await. Generally speaking, this will ensure that untill a mySQL query response has been generated per expectations no further actions are taken, and if there is an error for some reason, that can be detected- it will help us locate that error


function require_input(input_text){
    if(input_text){
      return true
    }
    return 'Please provide an answer, a response is required'
 }
 

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

              //the role inner join is fetching role description column from the role table using roleid

             // the department inner join fetches department description in a similar fashion

              // the left join- I want to copy information from the same employee table, as the manager itself is also an employee - as I cannot merge the same table with itself- so I make a copy of the table and then merge using the ids- For the remainder of the code I am simply referring to e_tablecopy as e

            console.table(employees_all)

    }, // br close show-employees-all async function

    //=================================================================================

      show_employees_bymanager: async function (){

    // Now I want to display all the employees by their respective managers- This will have a 2 part query

         // 1)  a) Shortlisting managers in the database only by managers 

        const managers_object = await query(
            
            `SELECT 
                e.id, 
                CONCAT(e.first_name, ' ', e.last_name) AS name

             FROM employee INNER JOIN employee e ON employee.manager_id = e.id

             GROUP BY employee.manager_id;`);

            console.log('Manager list stores',managers_object)
        
 // 1) b) prompting the user to select the manager

            //This is a critical step. Here I am mapping the manager_list- variable that was created to store the results of the query to slect managers by id from the employee table (after merging with its copy)

            // Now I want to display name but store id instead of the name inside the variable. This is important because I do not prefer to query MYSQL using the name I would rather use id

        const manager_list = managers_object.map(function(manager_in_managers_object) {
            // Note that the parameter manager_in_managers_object is the name that this function assigns to the individual components (name, id per manager) of the global manager_list object. By doing this I can pass on the manager_object as the options for the inquire that will actually display the name for selection but the variable will be storing the id instead

            return {
                name: manager_in_managers_object.name, 
                value: manager_in_managers_object.id
                   };
            
       });
       console.log('Manager Choices variable stores', manager_list)

        // Prompt which manager
        const chosen_manager = await inquirer.prompt({

            type: "list", 
            message: "Please select the manager ", 
            choices: manager_list, // Note that even though it displays the manager name in options, this only contains list of manager ids not the name as the value for the variable is assigned as id
            name: "manager_id", // I am not storing the user response as manager_id which it actually is
        });
        console.log ('User_answer variable stores', chosen_manager) // This is only containing manager id

    //     // 2) Quering all employees with a selected manager

        const employees_bymanager = await query(
            `SELECT 
                id ID, 
                CONCAT(first_name, ' ', last_name) AS 'Employee Names working under ${JSON.stringify(chosen_manager.manager_id)}'
             FROM employee
             WHERE manager_id = ?;`, chosen_manager.manager_id);

        console.table('Reult variable stores',employees_bymanager);


      }, // br close bymanager function
//=============================================================================

show_employees_byrole: async function() {
    // Obtaining all the titles from the roles along with the ids
    const roles_object = await query(
        `SELECT 
         id, title 
         FROM role;`);

         console.log ('roles_object stores', roles_object)

    const role_list = roles_object.map(function(role_in_roles_object) {
        return {
            
            name: role_in_roles_object.title, 
            value: role_in_roles_object.id};
   });
    // Prompt which role
    const chosen_role = await inquirer.prompt({
        type: "list", 
        message: "Please select the Job Role to display Employees working in that position", 
        choices: role_list,
        name: "role_id"
    });
    // Query
    const employees_byrole = await query(
        `SELECT 
            id, 
            CONCAT(first_name, ' ', last_name) AS "Employee Names for the selected role"
        FROM employee
        WHERE role_id = ?;`, chosen_role.role_id);
    console.table(employees_byrole);
},
//========================================================================

show_job_positions: async function() {
    // Query
    const role_info = await query(
        
        `SELECT 
            role.id AS ID, 
            role.title AS "Current Job Positions", 
            department.name AS Department, 
            CONCAT('$ ',FORMAT(role.salary , 2)," ") AS Salary 

        FROM role

        INNER JOIN department ON role.department_id = department.id
        ORDER BY ID;`);


    console.table(role_info);
},

//=========================================================================

show_departments: async function() {
    // Query
    const departments_info = await query(
        `SELECT
            department.id AS ID,
            department.name AS 'Department Name'

        FROM department 
        ORDER BY id;`);
    console.table(departments_info);
},

//====================================================================

add_employee: async function() {
    // Generating MYSQL query to obtain list of roles 

    const roles_object = await query(
        `SELECT 
            id, title 

         FROM role
         ORDER BY id;`);

    const role_list = roles_object.map(function(role_in_roles_object) {
            return {
                
                name: role_in_roles_object.title, 
                value: role_in_roles_object.id};
       });

       // Generating MYSQL query to obtain list of managers

       const managers_object = await query(
        `SELECT 
            id, 
            CONCAT(first_name, ' ', last_name) AS name

         FROM employee 
         ORDER BY id;`);

         const manager_list = managers_object.map(function(manager_in_managers_object) {
            return {
                name: manager_in_managers_object.name, 
                value: manager_in_managers_object.id
                   };
            
       });
       manager_list.push({name: "None", value: null})

       const new_employee_info = await inquirer.prompt([
                {
                    type: "input", 
                    name: "first_name",
                    message: "Please type in the new employee's first name?", 
                    validate: require_input
                
                }, 
                
                {
                    type: "input", 
                    name: "last_name",
                    message: "Please type in the new employee's last name?",
                    validate: require_input
                }, 
                
                {
                    type: "list", 
                    name: "role_id",
                    choices: role_list,
                    message: "Please select a Job position/ title for the new employee"
                
                }, 
                
                {
                    type: "list", 
                    message: "Please assign a manager to the new employee from a list", 
                    choices: manager_list,
                    name: "manager_id" 
                
                }

    

]);// end of new_employer_info_object inquirer prompt


const new_employee = await query(
    `INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES (?, ?, ?, ?);`, [

        new_employee_info.first_name.trim(),

        new_employee_info.last_name.trim(), 
        
        new_employee_info.role_id, 

        new_employee_info.manager_id]);

    console.log(`Thank you for submiting responses. ${new_employee_info.first_name.trim()}'s infromation has been registered as a new employee into the database`);
},

//=========================================================================
delete_employee: async function() {

    // Generating MYSQL query to obtain a list of employees
    const employees_object = await query(
        // contains all the employes in the company- their id and name
         `SELECT id, 
          CONCAT(first_name, ' ', last_name) AS name
          FROM employee;`);

    const employee_list = employees_object.map(function(employee_in_employees_object) {

         return {
             name: employee_in_employees_object.name, 
             value: employee_in_employees_object.id};
    });
    // Prompt information
    const selected_employee = await inquirer.prompt([
        
        {
            type: "list", 
            choices: employee_list,
            message: "Please select the employee whos record you intend to delete", 
            name: "id"
            
        },
    
       {
            type: "list",
            message: "Are you sure you want to permanently delete this record?", 
            name: "confirm", 
            choices: ["yes", "no"]
       }

        ]);// end of inquireer prompt for selected_employee

    // Verify before deleting
    if (selected_employee.confirm === "yes") {
        // Execute the query to delete record
        const deleted_employee = await query(

            `DELETE FROM employee WHERE id = ?;`, 
            selected_employee.id);
        
            console.log("The employee's record has been successfully deleted");
    }
},

//=========================================================================

update_employee_role: async function() {
    // Generating MYSQL query to obtain list of roles 
    const roles_object = await query(
        `SELECT 
            id, title 

         FROM role
         ORDER BY id;`);

    const role_list = roles_object.map(function(role_in_roles_object) {
            return {
                
                name: role_in_roles_object.title, 
                value: role_in_roles_object.id};
       });
  
    // Generating MYSQL query to obtain a list of employees
    const employees_object = await query(
        // contains all the employes in the company- their id and name
         `SELECT id, 
          CONCAT(first_name, ' ', last_name) AS name
          FROM employee;`);

    const employee_list = employees_object.map(function(employee_in_employees_object) {

         return {
             name: employee_in_employees_object.name, 
             value: employee_in_employees_object.id};
    });
    // Prompt information
    const selected_employee = await inquirer.prompt([
        
        
        {
            type: "list", 
            name: "id",
            choices: employee_list,
            message: "Please select the employee who's role you intend to update"
        
        },

    
    
        {
            type: "list", 
            name: "role_id",
            choices: role_list,
            message: "Please select a new Job position/ title for the employee"
        
        }, 

]);
    // Query
    const updated_employee = await query(
        `UPDATE employee 
         SET role_id = ? 
         WHERE id = ?;`, [selected_employee.role_id, selected_employee.id]);
    console.log("The employee's role has been successfully updated in the records");
},


//=========================================================================

exit: function() {
  
    connection.end();
}

//=========================================================================






}// br clsoe for orm

module.exports=orm