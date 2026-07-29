const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db');


// POST /api/auth/registro
router.post('/registro', async (req, res) => {
    const { nombre, email, password } = req.body;

    // Validación básica en el servidor
    if (!nombre || !email || !password) {
        return res.status(400).json({ status: 'error', message: 'Todos los campos son obligatorios.' });
    }

    try {
        // Verificar si el usuario ya existe
        const [existe] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (existe.length > 0) {
            return res.status(400).json({ status: 'error', message: 'El correo electrónico ya está registrado.' });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insertar en la base de datos
        await db.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
            [nombre, email, hashedPassword]
        );

        return res.status(201).json({ status: 'ok', message: 'Usuario registrado exitosamente.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Error interno del servidor.' });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ status: 'error', message: 'Ingrese correo y contraseña.' });
    }

    try {
        const [users] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ status: 'error', message: 'Credenciales inválidas.' });
        }

        const usuario = users[0];
        const match = await bcrypt.compare(password, usuario.password);

        if (!match) {
            return res.status(401).json({ status: 'error', message: 'Credenciales inválidas.' });
        }

        // Respuesta con datos del usuario sin exponer la contraseña
        return res.status(200).json({
            status: 'ok',
            message: 'Inicio de sesión exitoso.',
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Error en la autenticación.' });
    }
});

module.exports = router;
const db = require('../config/db');

router.post('/register', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        const [result] = await db.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
            [nombre, email, password]
        );
        res.status(201).json({ message: 'Usuario registrado con éxito', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
});