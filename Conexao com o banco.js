// db.js
const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',      // Seu usuário do MySQL
    password: 'senha', // Sua senha do MySQL
    database: 'clinica_db'
});

module.exports = db.promise();
