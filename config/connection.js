const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      
      user: 'root',
      
      password: '1234',
      database: 'employees_db'
    },
    console.log(`Connected to the database.`)
  );

  module.exports = db