const createTable = require('console.table');
const inquirer = require('inquirer');
const db = require ('./consql/connection');

const techFirm = () => {
    const response = await inquirer
    .prompt({
        {
            type: "list",
            message: "What do you want to do?",
            choices: [
                "Add a department",
                "Add an employee",
                "Add a role",
                "View a department",
                "View employees",
                "View a role",
                "Update employee roles",
                "Update employee managers",
                "View employees by manager",
                "Delete department",
                "Delete role",
                "Delete employee",
                "View the total utilized budget of a department",
                "Exit",
            ],
            name: 'directory',
            loop : false
        }
}).then((answer)=>{
    switch(answer.action){
        case "Add A deparment":
            addDeparment();
            break;

        case "Add an employee":
            addEmployee();
            break;

        case "Add a role":
            addRole();
            break;
        
        case "View a deparment":
            viewDepartment();
            break;
        
        case "View employees":
            viewEmployees();
            break;

        case "View a role":
            viewRole();
            break;

        case "Update employee roles":
            updateEmployeeRoles();
            break;

        case "Update managers":
            updateManagers();
            break;

        case "View employees by manger":
            employeeManagers();
            break;

        case "Delete department":
            deleteDepartment();
            break;

        case "Delete role":
            deleteRole();
            break;

        case "Delete employee":
            deleteEmployee();
            break;

        case "View the total utilized budget of a department":
            firmBudget();
            break;

        default:
            console.log(`Invalid action: ${answer.action}`);
            break;
        }
    });
};

