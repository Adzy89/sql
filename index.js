const cTable = require('console.table');
const inquirer = require('inquirer');
const db = require ('./consql/connection');

const techFirm = async () => {
    const response = await inquirer
    .prompt({
        {
            type: "list",
            message: "What do you want to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employees role",
                "Exit",
            ],
            name: 'directory',
            loop : false
        },
}).then((response) => {
    switch(response.action){
        case "View all Departments":
            viewDepartments();
            break;

        case "View all Roles":
            viewRoles();
            break;

        case "View all Empolyees":
            viewEmployees();
            break;
        
        case "Add a Department":
            addDepartment();
            break;
        
        case "Add a Role":
            addRole();
            break;

        case "Add an Employee":
            addEmployee();
            break;

        case "Update employee roles":
            updateEmployeeRoles();
            break; 

        default:
            console.log(`Invalid action: ${response.action}`);
            break;
        }
    })
}

async function viewDepartments() {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.table(result);
        }
    });
    intitalPrompt();
};

async function viewRoles() {
    const sql = `SELECT * FROM role`;

    db.query(sql, (err, result) => {
        if (err){
            console.log(err)
        }else{
            console.table(result);
        }
    });
    initalPrompt();

};

async function viewEmployees() {
    const sql = `SELECT * FROM employee`

    db.query(sql, (err, result)=>{
        if(err){
            console.log(err);
        }else{
            console.table(result);
        }
    });
    initalPrompt()
}

const departmentPrompt = async () {
    const response = await inquirer.prompt([
        {
            type : "input",
            message: "Choose a Department",
            name: "departmentName"
        }

    ])
    console.log(response)
    addDepartment(response.departmentName)
    initialPrompt()
};

const addDepartment = async(departmentName) => {
    const sql = `INSERT INTO deparmtent (name) VALUES (?)`;
    const data = [departmentName]

    db.query(sql, data, (err, result) => {
        if (err){
            console.log(err);
        }else if(!result.affectedRows){
            console.log('No affected rows!')
        }else {
            console.log(result)
        }
    });
}

const rolePrompt = async () => {
    const response = await inquirer.prompt({
        {
            type:"input",
            message: "Choose a Role ",
            name: "roleName"
        }
    })
    console.log(response)
    addRole(response.roleName)
    initialPrompt()
}

const addRole = asyunc (roleName) => {
    const sql =` INSERT INTO ROLE (tittle) VALUES (?)`:
    const params = [roleName]

    db.query(sql, params, (err, result)=>{
        if(err){
            console.log(err);
        }else if(!result.affectedRows){
            console.log('No affected rows!')
        }else{
            console.log(response);
        }
    });
}

const EmployeePrompt = async () => {
    const response = await inquirer
    .prompt([
        {
            type: "input",
            message: "Whos is the Employee"\
            name : "firstName"
        }
    ])
    console.log(response)
    addEmployee(response.firstName)
    initialPrompt()
}

const addEmployee = aysnc (firstName) =>{
    const sql =`INSET INTO employee (name) VALUES (?)`;
    const params = [firstName]

    db.query(sql, params, (err, result) =>{
        if(err){
            console.log(err);
        }else if(!result.affectedRows) {
            console.log('No affected rows!')
        } else {
            console.log(result);
        }
    })
}

