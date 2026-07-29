const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'dogtech_db', // <-- Asegúrate que apunte a tu BD
  port: Number(process.env.DB_PORT), // 👈 Lee DB_PORT
  ssl: {
    rejectUnauthorized: false       // 👈 Requerido por Aiven (SSL Mode: REQUIRED)
  },
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool.promise();

// Probar la conexión al iniciar
pool.getConnection()
    .then(connection => {
        console.log('✅ Conexión exitosa a la Base de Datos MySQL');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Error al conectar con la Base de Datos:', err.message);
    });

// Exportación directa
module.exports = pool;