const db = require("./db/connection");


function viewAllEmployees() {
    const query = `SELECT idemployee,first_name,last_name,role_id,manager_id FROM employee;`;
    db.query(query, (err, res) => {
        if (err) throw err;
        console.log('view employee by department');
        console.table(res);
    })
};


module.exports = viewAllEmployees();