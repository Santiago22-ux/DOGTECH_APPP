const mysql = require('mysql2/promise');

// Configuración con variables de entorno para Render / Nube
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'dogtech_db',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // Si la BD remota requiere SSL (muy común en Aiven, PlanetScale, Railway):
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

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