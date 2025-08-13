const express = require('express');
const router = express.Router();

const { register } = require('../controllers/auth/registerController');
const { login } = require('../controllers/auth/loginController');
const { validate } = require('../controllers/auth/validateController');
const { logout } = require('../controllers/auth/logoutController');
const { profile } = require('../controllers/auth/profileController');

const authMiddleware = require('../middlewares/authMiddleware');

// Públicos
router.post('/register', register);
router.post('/login', login);
router.post('/validate', validate);

// Protegidos
router.post('/logout', authMiddleware, logout);
router.get('/profile', authMiddleware, profile);

module.exports = router;
