const express = require('express');
const router = express.Router();

// Importar o Controller de Busca
const BuscaController = require('../Controllers/buscaControllers');

// ============================================================
// ROTAS GET - BUSCA DE QUESTÕES (Vestibular de Química)
// ============================================================

// GET /busca - Listar todas as questões
router.get('/', BuscaController.listarTodos);

// GET /busca/vestibular/:vestibular - Buscar por nome do vestibular
router.get('/vestibular/:vestibular', BuscaController.buscarPorVestibular);

// GET /busca/ano/:ano - Buscar questões de um ano específico
router.get('/ano/:ano', BuscaController.buscarPorAno);

// GET /busca/palavra-chave/:palavra - Buscar por palavra-chave
router.get('/palavra-chave/:palavra', BuscaController.buscarPorPalavraChave);

// GET /busca/:id - Buscar questão específica por ID
router.get('/:id', BuscaController.buscarPorId);


// ============================================================
// EXPORTAR O ROUTER
// ============================================================
module.exports = router;
