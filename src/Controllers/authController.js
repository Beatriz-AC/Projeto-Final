// Controller simples para autenticação usando variáveis de ambiente
const AUTH_USER = process.env.AUTH_USER;
const AUTH_PASSWORD = process.env.AUTH_PASSWORD;

async function login(req, res) {
  const { email, password } = req.body;

  if (!email  !password) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'E-mail e senha são obrigatórios.'
    });
  }

  if (email !== AUTH_USER  password !== AUTH_PASSWORD) {
    return res.status(401).json({
      sucesso: false,
      mensagem: 'E-mail ou senha incorretos.'
    });
  }

  return res.status(200).json({
    sucesso: true,
    token: 'token-de-exemplo-12345',
    usuario: { email }
  });
}

module.exports = {
  login
};