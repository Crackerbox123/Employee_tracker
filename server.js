const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/connection');
const inquirer = require('inquirer');

// const cTable = require('console.table');



const table = cTable.getTable(department)


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
  updateEmployeeManager: "Update Employee Manager",
  viewAllRoles: "View All Roles",
};

// inquirer prompt function

function prompt() {
  inquirer.prompt({
    name: 'intro',
    type: 'list',
    message: 'Select an option to begin',
    choices: [

    ]
  })
}