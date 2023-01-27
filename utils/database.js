const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'print_it',
    password: ''
});

module.exports = pool.promise();