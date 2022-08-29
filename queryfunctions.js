const db = require("./db/connection");



function viewAllEmployees() {
    const query = `SELECT idemployee,first_name,last_name,role_id,manager_id FROM employee;`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log('view employees');
        console.table(res);
    })
};

//function viewByDepartment() {
//    const query = `SELECT iddepartment,name FROM department;`;
//    db.query(query, (err, res) => {
//        if (err) throw err;
//        console.log('view departments');
//        console.table(res);
//    })
//};

//function viewAllRoles() {
//    const query = 'SELECT idemployee_role,title,salary,department_id FROM employee_role;'
//    db.query(query, (err, res) => {
//        if (err) throw err;
//        console.log('view roles');
//        console.table(res);
//    })
//};

//function addEmployee() {
//   async function addEmployee() {
//       const addname = await inquirer.prompt(askName());
//       db.query('SELECT role.id, role.title FROM role ORDER BY role.id;', async (err, res) => {
//           if (err) throw err;
//           const { role } = await inquirer.prompt([
//               {
//                   name: 'role',
//                   type: 'list',
//                   choices: () => res.map(res => res.title),
//                   message: 'What is the employee role?: '
//               }
//           ]);
//           let roleId;
//           for (const row of res) {
//               if (row.title === role) {
//                   roleId = row.id;
//                   continue;
//               }
//           }
//           db.query('SELECT * FROM employee', async (err, res) => {
//               if (err) throw err;
//               let choices = res.map(res => `${res.first_name} ${res.last_name}`);
//               choices.push('none');
//               let { manager } = await inquirer.prompt([
//                   {
//                       name: 'manager',
//                       type: 'list',
//                       choices: choices,
//                       message: 'Choose the employee Manager: '
//                   }
//               ]);
//               let managerId;
//               let managerName;
//               if (manager === 'none') {
//                   managerId = null;
//               } else {
//                   for (const data of res) {
//                       data.fullName = `${data.first_name} ${data.last_name}`;
//                       if (data.fullName === manager) {
//                           managerId = data.id;
//                           managerName = data.fullName;
//                           console.log(managerId);
//                           console.log(managerName);
//                           continue;
//                       }
//                   }
//               }
//               console.log('Employee has been added. Please view all employee to verify...');
//               db.query(
//                   'INSERT INTO employee SET ?',
//                   {
//                       first_name: addname.first,
//                       last_name: addname.last,
//                       role_id: roleId,
//                       manager_id: parseInt(managerId)
//                   },
//                   (err, res) => {
//                       if (err) throw err;
//                       prompt();
//   
//                   }
//               );
//           });
//       });
//   }
///};

//module.exports = viewByDepartment();
module.exports = viewAllEmployees();
//module.exports = viewAllRoles();

//module.exports = addEmployee();