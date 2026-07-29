const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares necesarios
app.use(cors());
app.use(express.json()); // OBLIGATORIO para leer req.body en formato JSON
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (HTML, CSS, JS del frontend)
app.use(express.static(path.join(__dirname, 'public'))); 
// Nota: Si tus HTML están en la raíz, cambia 'public' por '.'

// Endpoint de Registro
app.post('/api/auth/registro', (req, res) => {
    const { nombre, email, password } = req.body;

    // Validación simple en el backend
    if (!nombre || !email || !password) {
        return res.status(400).json({ 
            mensaje: 'Faltan campos obligatorios (nombre, email, password)' 
        });
    }

    // AQUÍ IRÍA LA LÓGICA DE TU BASE DE DATOS (MySQL)
    // Ejemplo simulado exitoso:
    console.log('Usuario a registrar:', { nombre, email });

    return res.status(201).json({ 
        mensaje: 'Usuario registrado con éxito',
        usuario: { nombre, email } 
    });
});

// Arrancar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});