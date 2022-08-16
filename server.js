

const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const db = require('./db/connection');



// start server after db connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  });