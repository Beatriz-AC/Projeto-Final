// =============================================
// MIDDLEWARE.JS - Todos os Middlewares em um arquivo
// Projeto: Química para Vestibular
// =============================================

// ====================== LOG MIDDLEWARE ======================
// Middleware que registra todas as requisições que chegam no servidor
const logMiddleware = (req, res, next) => {
  console.log(`📌 [${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();   // Passa para o próximo middleware ou rota
};

// ====================== ERROR MIDDLEWARE ======================
// Middleware de tratamento de erros (deve ser o último middleware)
const errorMiddleware = (erro, req, res, next) => {
  console.error('❌ Erro:', erro.message);

  res.status(500).json({
    sucesso: false,
    mensagem: 'Ocorreu um erro interno no servidor',
    // Mostra detalhes do erro apenas em ambiente de desenvolvimento
    erro: process.env.NODE_ENV === 'development' ? erro.message : undefined
  });
};

// ====================== AUTH MIDDLEWARE ======================
// Middleware de autenticação (proteção de rotas)
const authMiddleware = (req, res, next) => {
  
  // Pega o token enviado no cabeçalho Authorization
  const token = req.headers.authorization;

  // ====================== VALIDAÇÃO BÁSICA ======================
  if (!token) {
    return res.status(401).json({
      sucesso: false,
      mensagem: 'Acesso negado. Token não fornecido.'
    });
  }

  // Aqui você pode validar JWT no futuro
  // Por enquanto, só deixa passar (autenticação simulada)
  // TODO: Implementar verificação real com jwt.verify()
  
  next();   // Token existe → permite continuar para a rota
};

// ====================== EXPORTAÇÃO ======================
// Exporta todos os middlewares para serem usados no server.js ou nas rotas
module.exports = {
  logMiddleware,
  errorMiddleware,
  authMiddleware
};