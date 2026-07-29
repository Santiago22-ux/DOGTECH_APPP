const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors()); // 2. Habilitar CORS para todas las rutas
app.use(express.json()); // 3. Asegurar que parsea JSON
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos (Frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
const authRoutes = require('./routes/authRoutes');
const citasRoutes = require('./routes/citasRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/citas', citasRoutes);

// Ruta principal para servir el Frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Puerto dinámico asignado por Render (process.env.PORT)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en el puerto ${PORT}`);
});