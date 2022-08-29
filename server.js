const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/connection');

const cTable = require('console.table');



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


// inquirer prompt function