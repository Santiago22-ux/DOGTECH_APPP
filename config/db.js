const mysql = require('mysql2');

// Crear el Pool de conexiones
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'dogtech_db',
    port: Number(process.env.DB_PORT) || 3306,
    ssl: {
        rejectUnauthorized: false // Requerido para Aiven / SSL en la nube
    },
    waitForConnections: true,
    connectionLimit: 10
});

// Convertir a promesas para poder usar async/await y .then()
const db = pool.promise();

// Probar la conexión al iniciar el servidor
db.getConnection()
    .then(connection => {
        console.log('✅ Conexión exitosa a la Base de Datos MySQL');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Error al conectar con la Base de Datos:', err.message);
    });

module.exports = db;