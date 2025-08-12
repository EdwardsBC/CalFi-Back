// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();

const { register } = require('../controllers/auth/registerController');
const { login } = require('../controllers/auth/loginController');
const { validate } = require('../controllers/auth/validateController');
const { logout } = require('../controllers/auth/logoutController');
const { profile } = require('../controllers/auth/profileController');

const authMiddleware = require('../middlewares/authMiddleware');

// Endpoints públicos
router.post('/register', register);
router.post('/login', login);

// Endpoints protegidos
router.post('/validate', authMiddleware, validate);
router.post('/logout', authMiddleware, logout);
router.get('/profile', authMiddleware, profile);

module.exports = router;
