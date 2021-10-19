const mysql = require('mysql');
module.exports = connection = mysql.createPool({
    host: 'remotemysql.com',
    user: '8ANkWHzKvh',
    password: 'rZe7CxMS7J',
    database: '8ANkWHzKvh',
    connectionLimit: 10

});