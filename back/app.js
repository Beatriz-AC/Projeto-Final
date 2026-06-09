require('dotenv').config();

const express = require('express');
const path = require('path');
const { logMiddleware, errorMiddleware } = require('./src/Middleware/Middleware');
const authRoutes = require('./src/Routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ======================================================
// MIDDLEWARES
// ======================================================

app.use(express.json());
app.use(logMiddleware);

// ======================================================
// ROTAS
// ======================================================

const routes = require('./src/Routes/buscaRoutes');

app.use('/auth', authRoutes);
app.use('/busca', routes);

// ======================================================
// PÁGINAS
// ======================================================

const serveHomePage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Front', 'public', 'pages', 'Home.html'));
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Front', 'public', 'pages', 'index.html'));
});
app.get('/Home', serveHomePage);
app.get('/cadastro', (req, res) => {
    res.redirect('/login');
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'Front', 'public', 'pages', 'index.html'));
});
app.get('/api', (req, res) => {
    res.json({
        mensagem: 'API de Questões com PostgreSQL',
        versao: '3.0',
        ambiente: process.env.NODE_ENV || 'development',
        banco: 'PostgreSQL'
    });
});

// Serve static assets from the frontend public folder
app.use(express.static(path.join(__dirname, '..', 'Front', 'public')));

// ======================================================
// MIDDLEWARE DE TRATAMENTO DE ERRO
// ======================================================

app.use(errorMiddleware);

// ======================================================
// SERVIDOR
// ======================================================

app.listen(PORT, () => {

    console.log('='.repeat(50));
    console.log('🚀 Servidor rodando!');
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`💾 Banco: PostgreSQL (${process.env.DB_NAME})`);
    console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    console.log('='.repeat(50));

});