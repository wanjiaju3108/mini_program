var mysql = require('mysql');

var pool = mysql.createPool({
    host: '172.21.139.13',
    user: 'chaikuweishi',
    password: 'testweishi',
    port: '3314',
    database: 'mini_program',
});

module.exports.getPool = () => {
    return pool
}