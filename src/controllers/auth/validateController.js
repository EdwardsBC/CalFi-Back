const db = require('../../db/connection');
const jwt = require('jsonwebtoken');

exports.validate = async (req, res) => {
  const { correo, codigo } = req.body;

  try {
    if (!correo || !codigo) {
      return res.status(400).json({ success: false, message: 'Correo y código son obligatorios.' });
    }

    const [confirmacion] = await db.query(
      'SELECT name, password FROM confirmations WHERE email = ? AND code = ? LIMIT 1',
      [correo, codigo]
    );

    if (!confirmacion || confirmacion.length === 0) {
      return res.status(400).json({ success: false, message: 'Código inválido o expirado.' });
    }

    const { name, password } = confirmacion[0];

    const [result] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, correo, password]
    );

    await db.query('DELETE FROM confirmations WHERE email = ?', [correo]);

    const token = jwt.sign(
      { id: result.insertId, email: correo },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      success: true,
      message: 'Usuario registrado y logueado correctamente.',
      token,
      user: { id: result.insertId, name, email: correo }
    });

  } catch (error) {
    console.error('Error en /validate:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor al validar.' });
  }
};
