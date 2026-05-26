// Importar o Express para criar o router
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../Middleware/middleware');

// Importar o Controller de Busca
const buscaController = require('../Controllers/buscaController');

// Autenticação para acessar as rotas de busca
router.use(authMiddleware);

// ============================================================
// ROTAS GET - BUSCA DE QUESTÕES (Vestibular de Química)
// ============================================================

// GET /busca - Listar todas as questões (da View BUSCA)
router.get('/', buscaController.listarTodos);

// GET /busca/:id - Buscar questão específica por ID
router.get('/:id', buscaController.buscarPorId);

// GET /busca/vestibular/:vestibular - Buscar por nome do vestibular
router.get('/vestibular/:vestibular', buscaController.buscarPorVestibular);

// GET /busca/ano/:ano - Buscar questões de um ano específico
router.get('/ano/:ano', buscaController.buscarPorAno);

// GET /busca/palavra-chave/:palavra - Buscar por palavra-chave
router.get('/palavra-chave/:palavra', buscaController.buscarPorPalavraChave);


// ============================================================
// EXPORTAR O ROUTER
// ============================================================
module.exports = router;