const express = require('express');
const router = express.Router();   // Cria um roteador do Express

// ====================== IMPORTAÇÕES ======================
const AuthController = require('../Controllers/authControllers');   // Controlador com as funções de login
const authMiddleware = require('../Middleware/authMiddleware');    // Middleware de autenticação

// ====================== ROTAS DE AUTENTICAÇÃO ======================

// ROTA: Login
// Método: POST
// Endpoint: /auth/login
router.post('/login', AuthController.login);

// ROTA: Validar Token
// Método: GET
// Endpoint: /auth/validate
// Protegida pelo middleware de autenticação
router.get('/validate', authMiddleware, AuthController.validarToken);

// ====================== EXPORTAÇÃO ======================
// Exporta o roteador para ser usado no arquivo principal (server.js)
module.exports = router;