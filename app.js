require('dotenv').config();

const express = require('express');
const path = require('path');
const { logMiddleware, errorMiddleware } = require('./src/Middleware/middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// ======================================================
// MIDDLEWARES
// ======================================================

app.use(express.json());
app.use(express.static('./public'));
app.use(logMiddleware);

// ======================================================
// ROTAS
// ======================================================

const routes = require('./src/Routes/buscaRoutes');
const authRoutes = require('./src/Routes/authRoutes');

app.use('/questoes', routes);
app.use('/auth', authRoutes);

// ======================================================
// PÁGINAS
// ======================================================

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastro.html'));
});

app.get('/', (req, res) => {
    res.json({
        mensagem: 'API de Questões com PostgreSQL',
        versao: '3.0',
        ambiente: process.env.NODE_ENV || 'development',
        banco: 'PostgreSQL'
    });
});

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