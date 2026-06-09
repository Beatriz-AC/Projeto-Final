const express = require('express');
const router = express.Router();

// Importar o Controller de Busca
const BuscaController = require('../Controllers/buscaControllers');

// ============================================================
// ROTAS GET - BUSCA DE QUESTÕES (Vestibular de Química)
// ============================================================

// Rotas específicas devem vir PRIMEIRO

// GET /busca - Listar todas as questões
router.get('/', BuscaController.listarTodos);

// GET /busca/topicos-lista - Listar todos os tópicos
router.get('/topicos-lista', BuscaController.listarTopicos);

// GET /busca/vestibular/:vestibular - Buscar por nome do vestibular
router.get('/vestibular/:vestibular', BuscaController.buscarPorVestibular);

// GET /busca/ano/:ano - Buscar questões de um ano específico
router.get('/ano/:ano', BuscaController.buscarPorAno);

// GET /busca/palavra-chave/:palavra - Buscar por palavra-chave
router.get('/palavra-chave/:palavra', BuscaController.buscarPorPalavraChave);

// GET /busca/topicos/:topico - Buscar por tópico
router.get('/topicos/:topico', BuscaController.buscarPorTopico);

// GET /busca/:id/resposta - Buscar resposta de uma questão
router.get('/:id/resposta', BuscaController.buscarResposta);

// GET /busca/:id - Buscar questão específica por ID
router.get('/:id', BuscaController.buscarPorId);


// ============================================================
// EXPORTAR O ROUTER
// ============================================================
module.exports = router;
