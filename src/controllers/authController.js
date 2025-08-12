const express = require('express');
const router = express.Router();

const registerController = require('../controllers/auth/registerController');
const loginController = require('../controllers/auth/loginController');
const logoutController = require('../controllers/auth/logoutController');
const validateController = require('../controllers/auth/validateController');

// Registro de usuario (envía código)
router.post('/register', registerController.register);

// Validación del código recibido por correo
router.post('/validate', validateController.validate);

// Inicio de sesión
router.post('/login', loginController.login);

// Cierre de sesión
router.post('/logout', logoutController.logout);

module.exports = router;
