const mysql = require('mysql');

// Setting up mySQL connection
const connection=mysql.createConnection({

    host:'localhost',
    port: 3306,
    user:'root',
    // used .env to protect against password
    password: 'bootcamp',
    database:'employees_db'


});

connection.connect(function (err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

module.exports = connection