const db = require('../../db/connection');
const bcrypt = require('bcrypt');
const emailService = require('../../services/emailService');

exports.register = async (req, res) => {
  const { nombre, correo, password } = req.body;

  try {
    if (!nombre || !correo || !password) {
      return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios.' });
    }

    // Validar si el correo ya existe
    const [existingEmail] = await db.query('SELECT id FROM users WHERE email = ?', [correo]);
    if (existingEmail.length > 0) {
      return res.status(400).json({ success: false, message: 'El correo ya está registrado.' });
    }

    // Validar si el nombre de usuario ya existe
    const [existingUsername] = await db.query('SELECT id FROM users WHERE name = ?', [nombre]);
    if (existingUsername.length > 0) {
      return res.status(400).json({ success: false, message: 'El nombre de usuario ya está registrado.' });
    }

    // Generar código de verificación y encriptar la contraseña
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar en tabla de confirmaciones
    await db.query(
      'INSERT INTO confirmations (name, email, password, code) VALUES (?, ?, ?, ?)',
      [nombre, correo, hashedPassword, codigo]
    );

    // Enviar correo
    await emailService.sendVerificationEmail(correo, codigo);

    return res.status(200).json({ success: true, message: 'Código enviado al correo electrónico.' });

  } catch (error) {
    console.error('Error en /register:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor al registrar.' });
  }
};
