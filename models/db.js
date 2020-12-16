const mysql = require("mysql");
require('dotenv').config();

// Create a connection to the database




const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DEFAULT


});
// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
  });
  
module.exports = connection;
  