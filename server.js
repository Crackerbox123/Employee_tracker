const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/connection');
const inquirer = require('inquirer');

// const cTable = require('console.table');

// const table = cTable.getTable(department)


// start server after db connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    prompt();
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  });


// prompt table

const promptMessages = {
  viewAllEmployees: "View All Employees",
  viewByDepartment: "View All Employees By Department",
  viewByManager: "View All Employees By Manager",
  addEmployee: "Add An Employee",
  removeEmployee: "Remove An Employee",
  updateRole: "Update Employee Role",
  viewAllRoles: "View All Roles",
};

// inquirer prompt function

function prompt() {
  inquirer.prompt({
    name: 'intro',
    type: 'list',
    message: 'Select an option to begin',
    choices: [
      promptMessages.viewAllEmployees,
      promptMessages.viewByDepartment,
      promptMessages.viewByManager,
      promptMessages.addEmployee,
      promptMessages.removeEmployee,
      promptMessages.updateRole,
      promptMessages.viewAllRoles

    ]
  })
  .then(answer => {
            console.log('answer', answer);
            switch (answer.action) {
                case promptMessages.viewAllEmployees:
                    viewAllEmployees();
                    break;

                case promptMessages.viewByDepartment:
                    viewByDepartment();
                    break;

                case promptMessages.viewByManager:
                    viewByManager();
                    break;

                case promptMessages.addEmployee:
                    addEmployee();
                    break;

                case promptMessages.removeEmployee:
                    remove('delete');
                    break;

                case promptMessages.updateRole:
                    remove('role');
                    break;

                case promptMessages.viewAllRoles:
                    viewAllRoles();
                    break;

                case promptMessages.exit:
                    connection.end();
                    break;
            }
        });
};