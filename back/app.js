require('dotenv').config();

const express = require('express');
const fs = require('fs');
const path = require('path');
const { logMiddleware, errorMiddleware } = require('./src/Middleware/Middleware');
const authRoutes = require('./src/Routes/authRoutes');
const buscaRoutes = require('./src/Routes/buscaRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const distPath = path.join(__dirname, 'dist');
const hasFrontend = fs.existsSync(path.join(distPath, 'index.html'));

// ======================================================
// MIDDLEWARES
// ======================================================

app.use(express.json());
app.use(logMiddleware);

// ======================================================
// ROTAS
// ======================================================

app.use('/auth', authRoutes);
app.use('/busca', buscaRoutes);

// ======================================================
// PÁGINAS / SAÚDE
// ======================================================

app.get('/api', (req, res) => {
  res.json({
    mensagem: 'API de Questões com PostgreSQL',
    versao: '3.0',
    ambiente: process.env.NODE_ENV || 'development',
    banco: 'PostgreSQL',
    frontend: hasFrontend ? 'build disponível' : 'frontend não construído'
  });
});

if (hasFrontend) {
  app.use(express.static(distPath));

  app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({
      sucesso: true,
      mensagem: 'Backend API ativa. Rode npm run build para gerar o frontend.'
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      sucesso: false,
      mensagem: 'Rota não encontrada.'
    });
  });
}

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