const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/connection');
const inquirer = require('inquirer');
//queries = require('./queryfunctions');
const cTable = require('console.table');
const util = require('util');


// promisify magic
db.query = util.promisify(db.query);
// start server after db db
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
      initialAction();
    });
  });
  console.table(
    "\n------------ EMPLOYEE TRACKER ------------\n",
    "\n------------------------------------------\n"
)
const initialAction = async () => {
    try {
        let answer = await inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View Employees',
                'View Departments',
                'View Roles',
                'Add Employees',
                'Add Departments',
                'Add Roles',
                'Update Employee Role',
                'Exit'
            ]
        });
        switch (answer.action) {
            case 'View Employees':
                employeeView();
                break;

            case 'View Departments':
                departmentView();
                break;

            case 'View Roles':
                roleView();
                break;

            case 'Add Employees':
                employeeAdd();
                break

            case 'Add Departments':
                departmentAdd();
                break

            case 'Add Roles':
                roleAdd();
                break

            case 'Update Employee Role':
                employeeUpdate();
                break

            case 'Exit':
                db.end();
                break;
        };
    } catch (err) {
        console.log(err);
        initialAction();
    };
}
// Selection to view all of the employees.
const employeeView = async () => {
    console.log('Employee View');
    try {
        let query = 'SELECT * FROM employee';
        db.query(query, function (err, res) {
            if (err) throw err;
            let employeeArray = [];
            res.forEach(employee => employeeArray.push(employee));
            console.table(employeeArray);
            initialAction();
        });
    } catch (err) {
        console.log(err);
        initialAction();
    };
};

// Selection to view all of the departments.
const departmentView = async () => {
    console.log('Department View');
    try {
        let query = 'SELECT * FROM department';
        db.query(query, function (err, res) {
            if (err) throw err;
            let departmentArray = [];
            res.forEach(department => departmentArray.push(department));
            console.table(departmentArray);
            initialAction();
        });
    } catch (err) {
        console.log(err);
        initialAction();
    };
};

// Selection to view all of the roles.
const roleView = async () => {
    console.log('Role View');
    try {
        let query = 'SELECT * FROM role';
        db.query(query, function (err, res) {
            if (err) throw err;
            let roleArray = [];
            res.forEach(role => roleArray.push(role));
            console.table(roleArray);
            initialAction();
        });
    } catch (err) {
        console.log(err);
        initialAction();
    };
};

// Selection to add a new employee.
const employeeAdd = async () => {
    try {
        console.log('Employee Add');

        let roles = await db.query("SELECT * FROM role");

        let managers = await db.query("SELECT * FROM employee");

        let answer = await inquirer.prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'What is the first name of this Employee?'
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'What is the last name of this Employee?'
            },
            {
                name: 'employeeRoleId',
                type: 'list',
                choices: roles.map((role) => {
                    return {
                        name: role.title,
                        value: role.idrole
                    }
                }),
                message: "What is this Employee's role id?"
            },
            {
                name: 'employeeManagerId',
                type: 'list',
                choices: managers.map((manager) => {
                    return {
                        name: manager.first_name + " " + manager.last_name,
                        value: manager.id
                    }
                }),
                message: "What is this Employee's Manager's Id?"
            }
        ])

        let result = await db.query("INSERT INTO employee SET ?", {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: (answer.employeeRoleId),
            manager_id: (answer.employeeManagerId)
        });

        console.log(`${answer.firstName} ${answer.lastName} added successfully.\n`);
        initialAction();

    } catch (err) {
        console.log(err);
        initialAction();
    };
};

// Selection to add a new department.
const departmentAdd = async () => {
    try {
        console.log('Department Add');

        let answer = await inquirer.prompt([
            {
                name: 'deptName',
                type: 'input',
                message: 'What is the name of your new department?'
            }
        ]);

        let result = await db.query("INSERT INTO department SET ?", {
            name: answer.deptName
        });

        console.log(`${answer.deptName} added successfully to departments.\n`)
        initialAction();

    } catch (err) {
        console.log(err);
        initialAction();
    };
};

// Selection to add a new role.
const roleAdd = async () => {
    try {
        console.log('Role Add');

        let departments = await db.query("SELECT * FROM department")

        let answer = await inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the name of your new role?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What salary will this role provide?'
            },
            {
                name: 'departmentId',
                type: 'list',
                choices: departments.map((departmentId) => {
                    return {
                        name: departmentId.department_name,
                        value: departmentId.id
                    }
                }),
                message: 'What department ID is this role associated with?',
            }
        ]);
        
        let chosenDepartment;
        for (i = 0; i < departments.length; i++) {
            if(departments[i].department_id === answer.choice) {
                chosenDepartment = departments[i];
            };
        }
        let result = await db.query("INSERT INTO role SET ?", {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.departmentId
        })

        console.log(`${answer.title} role added successfully.\n`)
        initialAction();

    } catch (err) {
        console.log(err);
        initialAction();
    };
}


// Selection to update a roll for a specific employee.
const employeeUpdate = async () => {
    try {
        console.log('Employee Update');
        
        let employees = await db.query("SELECT * FROM employee");

        let employeeSelection = await inquirer.prompt([
            {
                name: 'employee',
                type: 'list',
                choices: employees.map((employeeName) => {
                    return {
                        name: employeeName.first_name + " " + employeeName.last_name,
                        value: employeeName.id
                    }
                }),
                message: 'Please choose an employee to update.'
            }
        ]);

        let roles = await db.query("SELECT * FROM role");

        let roleSelection = await inquirer.prompt([
            {
                name: 'role',
                type: 'list',
                choices: roles.map((roleName) => {
                    return {
                        name: roleName.title,
                        value: roleName.idrole
                    }
                }),
                message: 'Please select the role to update the employee with.'
            }
        ]);

        let result = await db.query("UPDATE employee SET ? WHERE ?", [{ role_id: roleSelection.role }, { id: employeeSelection.employee }]);

        console.log(`The role was successfully updated.\n`);
        initialAction();

    } catch (err) {
        console.log(err);
        initialAction();
    };
}
