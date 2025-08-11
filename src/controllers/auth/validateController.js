const db = require('../db');

exports.validate = async (req, res) => {
  const { correo, codigo } = req.body;

  try {
    if (!correo || !codigo) {
      return res.status(400).json({ success: false, message: 'Correo y código son obligatorios.' });
    }

    const [confirmacion] = await db.query(
      'SELECT * FROM confirmations WHERE email = ? AND code = ?',
      [correo, codigo]
    );

    if (confirmacion.length === 0) {
      return res.status(400).json({ success: false, message: 'Código inválido o expirado.' });
    }

    const { name, password } = confirmacion[0];

    await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, correo, password]
    );

    await db.query('DELETE FROM confirmations WHERE email = ?', [correo]);

    return res.status(200).json({ success: true, message: 'Usuario registrado correctamente.' });

  } catch (error) {
    console.error('Error en /validate:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor al validar.' });
  }
};
