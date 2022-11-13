const mysql = require('mysql-await');
require('dotenv').config();


const con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
})

con.connect((err) => {
    if(err) throw err;
})

module.exports = con;