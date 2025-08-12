// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; // Formato: Bearer <token>
  if (!token) return res.status(401).json({ message: 'Acceso denegado. Token requerido.' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Guardamos datos decodificados del usuario
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Token inválido.' });
  }
};
