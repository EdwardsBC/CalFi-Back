const db = require('../../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    if (!correo || !password) {
      return res.status(400).json({ success: false, message: 'Correo y contraseña son obligatorios.' });
    }

    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [correo]);
    const user = users[0];

    if (!user) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({
      success: true,
      message: 'Inicio de sesión exitoso.',
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });

  } catch (error) {
    console.error('Error en /login:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor al iniciar sesión.' });
  }
};
