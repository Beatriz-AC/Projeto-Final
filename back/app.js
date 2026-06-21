require('dotenv').config();   // Carrega as variáveis de ambiente do arquivo .env

const express = require('express');           // Framework principal do servidor
const path = require('path');                 // Módulo nativo para manipular caminhos de arquivos

// Importação dos middlewares
const { logMiddleware, errorMiddleware } = require('./src/Middleware/Middleware');

// Importação das rotas
const authRoutes = require('./src/Routes/authRoutes');

const app = express();                        // Cria a aplicação Express
const PORT = process.env.PORT || 3000;        // Define a porta (usa .env ou 3000 como padrão)

// ======================================================
// MIDDLEWARES GLOBAIS
// ======================================================

app.use(express.json());           // Permite o servidor ler JSON no body das requisições (POST, PUT, etc.)
app.use(logMiddleware);            // Registra todas as requisições no console (muito útil para debug)

// ======================================================
// ROTAS
// ======================================================

const routes = require('./src/Routes/buscaRoutes');   // Importa as rotas de busca

// Rotas de autenticação
app.use('/auth', authRoutes);

// Rotas de busca de questões (todas protegidas por autenticação)
app.use('/busca', routes);

// ======================================================
// ROTAS PARA PÁGINAS (FRONTEND)
// ======================================================

// Serve a página inicial (Home)
const serveHomePage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Front', 'public', 'pages', 'Home.html'));
};

// Rota raiz - Página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Front', 'public', 'pages', 'index.html'));
});

// Rota /Home
app.get('/Home', serveHomePage);

// Redireciona cadastro para login (temporário)
app.get('/cadastro', (req, res) => {
    res.redirect('/login');
});

// Rota de login (serve a mesma página index.html)
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Front', 'public', 'pages', 'index.html'));
});

// Rota de informações da API
app.get('/api', (req, res) => {
    res.json({
        mensagem: 'API de Questões com PostgreSQL',
        versao: '3.0',
        ambiente: process.env.NODE_ENV || 'development',
        banco: 'PostgreSQL'
    });
});

// ======================================================
// ARQUIVOS ESTÁTICOS (CSS, JS, IMAGENS, ETC)
// ======================================================

// Serve todos os arquivos estáticos da pasta Front/public
app.use(express.static(path.join(__dirname, '..', 'Front', 'public')));

// ======================================================
// MIDDLEWARE DE TRATAMENTO DE ERROS (DEVE SER O ÚLTIMO)
// ======================================================

app.use(errorMiddleware);

// ======================================================
// INICIALIZAÇÃO DO SERVIDOR
// ======================================================

app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('🚀 Servidor rodando!');
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`💾 Banco: PostgreSQL (${process.env.DB_NAME})`);
    console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    console.log('='.repeat(50));
});