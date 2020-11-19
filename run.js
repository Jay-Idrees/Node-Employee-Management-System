const inquirer=require('inquirer')
const orm=require('./config/orm')

async function main(){
    let perform_task =""
    while (perform_task !=='exit'){
       const chosen_task =await inquirer.prompt ([

        {
            type:'list',
            message:'Please select the task you would like to perform',
            name:'instruction',
            choices:
            [
                {name:'Show all Employees in my company', value:'employees_all'},

                {name:'Show all employees by their Manager', value:'employees_bymanager'},

                {name:'Show all employees by their position', value:'employees_byrole'},

                {name:'Show all job positions in the company', value:'roles_info'},

                {name:'Show all Departments in the company', value:'departments_info'},

                // {name:'Modify Employee records', 
                // value:'modify_records'},

                // Adding Employees
                {name:'Add new Employee information to records', 
                value:'add_employee'},

                // Deleting Employees
                {name:'Delete an existing Employee information from records', 
                value:'delete_employee'},

                {name:"Update an existing Employee's role in the records", 
                value:'update_employee_role'},



                {name:'Exit', 
                value:'exit'}
            ],

        }, // br close for the response object

       ]); // br close for the inquirer prompt 

       
      perform_task=chosen_task.instruction
    //    console.log(perform_task) // working fine



switch(perform_task){
// Notice that 0rm.function are plugins for the respective async await functions
    case 'employees_all': await orm.show_employees_all();
    break;

    case 'employees_bymanager': await orm.show_employees_bymanager();
    break;

    case 'employees_byrole': await orm.show_employees_byrole();
    break;

    case 'roles_info': await orm.show_job_positions();
    break;

    case 'departments_info': await orm.show_departments();
    break;

    case 'add_employee': await orm.add_employee();
    break;

    case 'delete_employee': await orm.delete_employee();
    break;

    case 'update_employee_role': await orm.update_employee_role();
    break;


    case 'exit': await orm.exit();
    break;

}// br close for switch





    } // br close while loop

} // br close for async function





main()