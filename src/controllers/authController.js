const express = require('express');
const router = express.Router();

const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const logoutController = require('../controllers/logoutController');
const validateController = require('../controllers/validateController');

// Registro de usuario (envía código)
router.post('/register', registerController.register);

// Validación del código recibido por correo
router.post('/validate', validateController.validate);

// Inicio de sesión
router.post('/login', loginController.login);

// Cierre de sesión
router.post('/logout', logoutController.logout);

module.exports = router;
