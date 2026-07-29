const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST /api/citas (Crear cita)
router.post('/', async (req, res) => {
    const { usuario_id, nombre_mascota, especie_raza, motivo, fecha_cita } = req.body;

    if (!usuario_id || !nombre_mascota || !especie_raza || !motivo || !fecha_cita) {
        return res.status(400).json({ status: 'error', message: 'Todos los campos de la cita son obligatorios.' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO citas (usuario_id, nombre_mascota, especie_raza, motivo, fecha_cita) VALUES (?, ?, ?, ?, ?)',
            [usuario_id, nombre_mascota, especie_raza, motivo, fecha_cita]
        );

        return res.status(201).json({
            status: 'ok',
            message: 'Cita agendada correctamente.',
            citaId: result.insertId
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Error al agendar la cita.' });
    }
});

// GET /api/citas/usuario/:usuario_id (Obtener citas por usuario)
router.get('/usuario/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;

    try {
        const [citas] = await db.query(
            'SELECT * FROM citas WHERE usuario_id = ? ORDER BY fecha_cita ASC',
            [usuario_id]
        );
        return res.status(200).json({ status: 'ok', citas });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', message: 'Error al consultar las citas.' });
    }
});

module.exports = router;