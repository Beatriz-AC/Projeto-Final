const express = require('express');
const router = express.Router();

const authController = require('../Controllers/authController');

// POST /auth/login - Autenticação do usuário
router.post('/login', authController.login);

module.exports = router;