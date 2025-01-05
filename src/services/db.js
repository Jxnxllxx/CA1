require('dotenv').config(); //read .env file and set environment variables

const mysql = require('mysql2');

const setting = {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'rootroot',
    database: 'ca1',
    multipleStatements: true,
    dateStrings: true
};

const pool = mysql.createPool(setting);

module.exports = pool;