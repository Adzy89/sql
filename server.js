const createTable = require('console.table');
const inquirer = require('inquirer');
const db = require ('./config/connection');

const techFirm = async () => {
    const response = await inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: [
                "view all departments",
                "view all roles",
                "view all employees",
                "add a department",
                "add a role",
                "add an employee",
                "update an employees role",
                "end",
            ],
            name: 'directory',
            loop : false
        },
    ]);
    console.log(response)
    switch(response.directory) {
        case "view all departments":
            viewDepartments();
            break;

        case "view all roles":
            viewRoles();
            break;

        case "view all empolyees":
            viewEmployees();
            break;
        
        case "add a department":
            departmentPrompt();
            break;
        
        case "add a role":
            rolePrompt();
            break;

        case "add an employee":
            employeePrompt();
            break;

        case "update employee roles":
            updateEmployeeRolesPrompt();
            break; 

        case "End":
            connection.end();
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
    const sql = `INSERT INTO department (name) VALUES (?)`;
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
    const sql =` INSERT INTO role (title) VALUES (?)`;
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

const employeePrompt = async () => {
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
};

 const addEmployee = async (firstName, lastName, id) => {
    const sql =`INSERT INTO employee (first_name) employee (last_name) employee (role_id) VALUES (?)`;
    const params = [firstName, lastName, id]

    db.query(sql, params, (err, result) =>{
        if(err){
            console.log(err);
        }else if(!result.affectedRows) {
            console.log('No affected rows!')
        } else {
            console.log(result);
        }
    });
};

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
};


const updateEmployeeRoles = async (firstName, lastName, id) => {
    const sql = `UPDATE INTO employee (first_name) employee (last_name) employee (role_id) VALUES (?)`;
    const params = [firstName, lastName ,id]
    
    db.query(sql, params, (err, result) =>{
        if(err){
            console.log(err);
        }else if(!result.affectedRows){
            console.log('No affected rows!')
        } else {
            console.log(result)
        }
    })
};

techFirm();