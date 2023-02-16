// const createTable = require('console.table');
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
                "update an employee role",
                "Exit",
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

        case "view all employees":
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

        case "exit":
            end();
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
            console.table(result);
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
            console.table(result);
        }
    });
    techFirm();

};

const viewEmployees = async() => {
    const sql = `SELECT * FROM employee`;

    db.query(sql, (err, result)=>{
        if(err){
            console.log(err);
        }else{
            console.table(result);
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
            console.table(result)
        }
    });
};

const rolePrompt = async () => {
    const response = await inquirer.prompt([
        {
            type: "input",
            message: "Choose a Role ",
            name: "roleName"
        },
        {
            type: "number",
            message: "What is the salary?",
            name: "salary"
        },
        {
            type: "input",
            message: "Which department_id?",
            name: "department_id"
        }
    ])
    console.log(response)
    addRole(response.roleName, response.salary, response.department_id)
    techFirm();
};

const addRole = async(roleName, salary, department_id) => {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
    const params = [roleName, salary, department_id]

    db.query(sql, params, (err, result)=>{
        if(err){
            console.log(err);
        }else if(!result.affectedRows){
            console.log('No affected rows!')
        }else{
            console.table(response);
        }
    });
};

const employeePrompt = async () => {
    const response = await inquirer.prompt([
        {
            type: "input",
            message: "Employee First Name?",
            name : "firstName"
        },
        {
            type: "input",
            message: "Employee last Name?",
            name: "lastName"
        },
        // {
        //     type: "input",
        //     message: "role id ?",
        //     id: "role_id"
        // },
        // {
        //     type: "input",
        //     message: "Who's the employees manager?",
        //     name:  "employeeManager"
        // },
    ])
    console.log(response)
    // console.log(response.role_id);
    addEmployee(response.firstName, response.lastName, response.role_id, response.manager_id )
    techFirm();
}

 const addEmployee = async (firstName, lastName, role_id, manager_id) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)`;
    const params = [firstName, lastName, role_id, manager_id]

    db.query(sql, params, (err, result) =>{
        if(err){
            console.log(err);
        }else if(!result.affectedRows) {
            console.log('No affected rows!')
        } else {
            console.table(result);
        }
    });
};

const updateEmployeeRolesPrompt = async() => {
    const response = await inquirer.prompt([
        {
            type: "input",
            message: "Which Employee are you updating ?",
            name : "firstName"
        },
        {
            type: "input",
            message: "Employee first Name ?",
            name: "lastName"
        },
        {
            type: "number",
            message: "Employee last name ?",
            id: "role_id"
        }
    ])
    console.log(response)
    updateEmployeeRoles(response.firstName, response.lastName, response.role_id,);
    techFirm();
};


const updateEmployeeRoles = async (firstName, lastName, role_id) => {
    const sql = `UPDATE INTO employee (first_name, last_name, role_id) VALUES (?,?,?)`;
    const params = [firstName, lastName, role_id]
    
    db.query(sql, params, (err, result) => {
        if(err){
            console.log(err);
        }else if(!result.affectedRows){
            console.log('No affected rows!')
        } else {
            console.table(result)
        }
    })
};

techFirm();