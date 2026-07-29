const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const citasRoutes = require('./routes/citasRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos de la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/citas', citasRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor de DogTech ejecutándose en http://localhost:${PORT}`);
});