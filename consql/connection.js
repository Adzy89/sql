const mysql = require('mysql2');

const db = mysql.connect(
    {
      host: 'localhost',
      
      user: 'root',
      
      password: '',
      database: 'employees_db'
    },
    console.log(`Connected to the database.`)
  );

  module.exports = db