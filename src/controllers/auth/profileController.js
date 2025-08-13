const db = require('../../db/connection');

exports.profile = async (req, res) => {
  try {
    const userId = req.user.id; // viene del authMiddleware
    const [rows] = await db.query(
      'SELECT id, name, email FROM users WHERE id = ? LIMIT 1',
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    return res.json(rows[0]);
  } catch (error) {
    console.error('Error en /profile:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
  }
};
