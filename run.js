const inquirer=require('inquirer')
const orm=require('./config/orm')

async function main(){
    let perform_task =""
    while (perform_task !=='Exit'){
       const response =await inquirer.prompt ([

        {
            type:'list',
            message:'Please select the task you would like to perform',
            name:'task',
            choices:
            [
                {name:'Show all Employees in my company', value:'employees_all'},

                {name:'Show all employees by their Manager', value:'employees_bymanager'},

                {name:'Show all employees by their position', value:'employees_byrole'},

                {name:'Show all job positions in the company', value:'roles_all'},

                {name:'Show all Departments in the company', value:'departments_all'},

                {name:'Modify Employee records', 
                value:'modify_records'},

                {name:'Exit', 
                value:'exit'}
            ],

        }, // br close for the response object

       ]); // br close for the inquirer prompt 

       
      perform_task=response.task
    //    console.log(perform_task) // working fine

perform_task=response.task

switch(perform_task){

    case 'employees_all': await orm.show_employees_all();
    break;

    case 'employees_bymanager': await orm.show_employees_bymanager();
    break;

    case 'employees_byrole': await orm.show_employees_byrole();
    break;

    case 'roles_all': await orm.show_job_positions();
    break;

    case 'departments_all': await orm.show_departments();
    break;

}// br close for switch





    } // br close while loop

} // br close for async function





main()