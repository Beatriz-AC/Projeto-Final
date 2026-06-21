const path = require('path');                    // Módulo para trabalhar com caminhos de arquivos
require('dotenv').config({ 
    path: path.resolve(__dirname, '..', '..', '.env') 
}); // Carrega o arquivo .env que está dois níveis acima (raiz do projeto)

// ====================== IMPORTAÇÃO DO POSTGRES ======================
const { Pool } = require('pg');   // Pool de conexões do PostgreSQL (melhor performance para múltiplas requisições)

// ====================== TRATAMENTO DE VARIÁVEIS DE AMBIENTE ======================
const dbPassword = process.env.DB_PASSWORD 
    ? String(process.env.DB_PASSWORD) 
    : undefined;

const dbPort = Number.isNaN(Number(process.env.DB_PORT)) 
    ? 5432 
    : parseInt(process.env.DB_PORT, 10);

// ====================== VALIDAÇÃO DE SENHA ======================
if (!dbPassword) {
  console.error('❌ Erro: a variável DB_PASSWORD não está definida ou não é uma string.');
  console.error('💡 Verifique suas credenciais no arquivo .env e reinicie o servidor.');
}

// ====================== CONFIGURAÇÃO DA POOL DE CONEXÃO ======================
// Pool gerencia múltiplas conexões de forma eficiente
const pool = new Pool({
  user: process.env.DB_USER,           // Usuário do banco
  host: process.env.DB_HOST,           // Host (geralmente localhost ou IP)
  database: process.env.DB_NAME,       // Nome do banco de dados
  password: dbPassword,                // Senha (tratada acima)
  port: dbPort,                        // Porta (padrão 5432)
});

// ====================== TESTE DE CONEXÃO ======================
// Testa a conexão assim que o arquivo é carregado
pool.connect((erro, client, release) => {
  if (erro) {
    console.error('❌ Erro ao conectar ao PostgreSQL:', erro.message);
    console.error('💡 Verifique suas credenciais no arquivo .env');
  } else {
    console.log('✅ Conectado ao PostgreSQL com sucesso!');
    console.log(`📊 Banco: ${process.env.DB_NAME}`);
    console.log(`🏠 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    release();   // Libera a conexão de teste de volta para o pool
  }
});

// ====================== EXPORTAÇÃO ======================
// Exporta o pool para ser usado nos Models
module.exports = pool;