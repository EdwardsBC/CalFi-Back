// src/controllers/auth/profileController.js
const db = require('../../db/connection');

exports.profile = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, username, email, created_at FROM users WHERE id = ?',
      [req.user.id] // id viene del token
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
