// Imports
const { Client } = require("pg");
require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_DATABASE, DB_HOST, DB_PORT } = process.env;

// Connection
const db = new Client({
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  host: DB_HOST,
  port: DB_PORT,
});

// Check connection
db.connect((error) => {
  if (error) {
    console.error("Failed to connect database!");
  } else {
    console.log("Connected to database!");
  }
});

// Exports
module.exports = db;
