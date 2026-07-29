const mysql = require('mysql2'); // o 'mysql2/promise'

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Tu contraseña de MySQL
    database: 'dogtech_db' // <-- El nombre de tu base de datos
});

// ⚠️ DEBES EXPORTARLO ASÍ (sin llaves):
module.exports = db;