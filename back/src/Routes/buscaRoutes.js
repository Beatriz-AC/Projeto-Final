const express = require('express');
const router = express.Router();   // Cria um roteador do Express

// ====================== IMPORTAÇÕES ======================
const BuscaController = require('../Controllers/buscaControllers');   // Controlador com as funções de busca
const authMiddleware = require('../Middleware/authMiddleware');      // Middleware de autenticação

// ====================== APLICAÇÃO DO MIDDLEWARE ======================
// Aplica o middleware de autenticação em TODAS as rotas deste arquivo
// Isso significa que o usuário precisa estar logado para acessar qualquer busca
router.use(authMiddleware);

// ====================== ROTAS DE BUSCA ======================

// ROTA: Listar todas as questões
// Endpoint: GET /busca/
router.get('/', BuscaController.listarTodos);

// ROTA: Buscar questão por ID
// Endpoint: GET /busca/id/:id
router.get('/id/:id', BuscaController.buscarPorId);

// ROTA: Buscar por palavra-chave
// Endpoint: GET /busca/palavra/:palavra
router.get('/palavra/:palavra', BuscaController.buscarPorPalavra);

// ROTA: Buscar por vestibular
// Endpoint: GET /busca/vestibular/:vestibular
router.get('/vestibular/:vestibular', BuscaController.buscarPorVestibular);

// ROTA: Buscar por ano
// Endpoint: GET /busca/ano/:ano
router.get('/ano/:ano', BuscaController.buscarPorAno);

// ROTA: Buscar por dificuldade
// Endpoint: GET /busca/dificuldade/:dificuldade
router.get('/dificuldade/:dificuldade', BuscaController.buscarPorDificuldade);

// ROTA: Listar tópicos (para os filtros no frontend)
// Endpoint: GET /busca/topicos-lista
router.get('/topicos-lista', BuscaController.listarTopicos);

// ROTA: Buscar questões por tópico
// Endpoint: GET /busca/topicos/:topico
router.get('/topicos/:topico', BuscaController.buscarPorTopico);

// ROTA: Buscar resposta/gabarito de uma questão
// Endpoint: GET /busca/resposta/:id
router.get('/resposta/:id', BuscaController.buscarResposta);

// ====================== EXPORTAÇÃO ======================
// Exporta o roteador para ser montado no servidor principal
module.exports = router;