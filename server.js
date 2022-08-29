const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/connection');
const inquirer = require('inquirer');
queries = require('./queryfunctions');
const cTable = require('console.table');


// start server after db connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    prompt();
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  });
  console.table(
    "\n------------ EMPLOYEE TRACKER ------------\n"
)


// prompt table

const promptMessages = {
  viewAllEmployees: "View All Employees",
  viewByDepartment: "View Departments",
  viewByManager: "View All Employees By Manager",
  addEmployee: "Add An Employee",
  removeEmployee: "Remove An Employee",
  updateRole: "Update Employee Role",
  viewAllRoles: "View All Roles",
};

// inquirer prompt function

async function prompt() {
  await inquirer.prompt({
    name: 'intro',
    type: 'list',
    message: 'Select an option to begin',
    choices: [
            'viewAllEmployees',
            'viewByDepartment',
            'addEmployee',
            'removeEmployee',
            'updateRole',
            'viewAllRoles'
    ]
  })
  .then(answer => {
            console.log('answer', answer);
            switch (answer.intro) {
                case 'viewAllEmployees':
                    viewAllEmployees();
                    break;

                case 'viewByDepartment':
                    viewByDepartment();
                    break;

                case 'addEmployee':
                    addEmployee();
                    break;

                case 'removeEmployee':
                    remove('delete');
                    break;

                case 'updateRole':
                    remove('role');
                    break;

                case 'viewAllRoles':
                    viewAllRoles();
                    break;

                case 'exit':
                    db.end();
                    break;
            }
        });
};





//function askName() {
//  return ([
//      {
//          name: "first",
//          type: "input",
//          message: "Enter the first name: "
//      },
//      {
//          name: "last",
//          type: "input",
//          message: "Enter the last name: "
//      }
//  ]);
//}
//
//
//