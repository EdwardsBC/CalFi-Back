const express = require('express');
const router = express.Router();
const { register } = require('../controllers/auth/registerController');
const { login } = require('../controllers/auth/loginController');
const { validate } = require('../controllers/auth/validateController');

router.post('/register', register);
router.post('/login', login);
router.post('/validate', validate);

module.exports = router;
