const createTable = require('console.table');
const inquirer = require('inquirer');
const db = require ('./config/connection');

const techFirm = async () => {
    const response = await inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
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
    ]);
    console.log(response)
    switch(response.directory) {
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
            departmentPrompt();
            break;
        
        case "Add a Role":
            rolePrompt();
            break;

        case "Add an Employee":
            employeePrompt();
            break;

        case "Update employee roles":
            updateEmployeeRolesPrompt();
            break; 

        default:
            console.log(`Invalid action: ${response.directory}`);
            break;
        }
 };


const viewDepartments = async() => {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            createTable(result);
        }
    });
    techFirm();
};
  
const viewRoles = async() => {
    const sql = `SELECT * FROM role`;

    db.query(sql, (err, result) => {
        if (err){
            console.log(err)
        }else{
            createTable(result);
        }
    });
    techFirm();

};

const viewEmployees = async() => {
    const sql = `SELECT * FROM employee`;

    db.query(sql, (err, result)=>{
        if(err){
            console.log(err)
        }else{
            createTable(result);
        }
    });
    techFirm();
};

const departmentPrompt = async () => {
    const response = await inquirer.prompt([
        {
            type : "input",
            message: "Choose a Department",
            name: "departmentName"
        }

    ])
    console.log(response)
    addDepartment(response.departmentName)
    techFirm();
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
            createTable(result)
        }
    });
};

const rolePrompt = async () => {
    const response = await inquirer.prompt([
        {
            type:"input",
            message: "Choose a Role ",
            name: "roleName"
        }
    ])
    console.log(response)
    addRole(response.roleName)
    techFirm();
};

const addRole = async(roleName) => {
    const sql =` INSERT INTO ROLE (tittle) VALUES (?)`;
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
};

const employeePrompt =async () => {
    const response = await inquirer.prompt([
        {
            type: "input",
            message: "Whos is the Employee?",
            name : "firstName"
        }
    ])
    console.log(response)
    addEmployee(response.firstName)
    techFirm();
}

 const addEmployee = async (id, firstName, lastName) => {
    const sql =`INSERT INTO employee (name) VALUES (?)`;
    const params = [id, firstName, lastName]

    db.query(sql, params, (err, result) =>{
        if(err){
            console.log(err);
        }else if(!result.affectedRows) {
            console.log('No affected rows!')
        } else {
            console.log(result);
        }
    });
}

const updateEmployeeRolesPrompt = async() => {
    const response = await inquirer.prompt([,
        {
            type: "input",
            message: "Which Employee are you updating? ",
            name : "employee"
        }
    ])
    console.log(response)
    updateEmployeeRoles(response.id, response.firstName, response.lastName);
    techFirm();
}


const updateEmployeeRoles = async (id, firstName, lastName) =>{
    const sql = `UPDATE INTO employee (id) employee (first_name) employee(last_name) VALUES (?)`;
    const params = [id, firstName, lastName]
    
    db.query(sql, params, (err, result) =>{
        if(err){
            console.log(err);
        }else if(!result.affectedRows){
            console.log('No affected rows!')
        } else {
            console.log(result)
        }
    })
}

techFirm();