const inquirer=require('inquirer')

async function main(){
    let selected_task =""
    while (selected_task !=='Exit'){
       const response =await inquirer.prompt ([

        {
            type:'list',
            message:'Please select the task you would like to perform',
            name:'task',
            choices:
            [
                {name:'I want to view a list of all the Employees in my company', value:'employees_all'},
                {name:'I want to view a list all employees working under a specific manager', value:'employees_bymanager'},
                {name:'I want to view all employees by their position', value:'employees_byposition'}
            ],

        }, // br close for the response object

       ]); // br close for the inquirer prompt 

       
       selected_task=response.task
    //    console.log(selected_task) - working fine

    } // br close while loop

} // br close for async function
main()