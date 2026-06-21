const jwt = require('jsonwebtoken');   // Biblioteca para verificar tokens JWT

// ====================== MIDDLEWARE DE AUTENTICAÇÃO ======================
// Este middleware protege rotas que precisam de login
const authMiddleware = (req, res, next) => {

    // Pega o header Authorization da requisição
    const authHeader = req.headers['authorization'];

    // Extrai o token (formato esperado: "Bearer TOKEN_AQUI")
    const token = authHeader && authHeader.split(' ')[1]; 

    // ====================== VALIDAÇÃO: TOKEN EXISTE? ======================
    if (!token) {
        return res.status(401).json({           // 401 = Unauthorized
            sucesso: false,
            mensagem: 'Token não fornecido.'
        });
    }

    try {
        // ====================== VERIFICAÇÃO DO TOKEN ======================
        // Verifica se o token é válido e não expirou
        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET || 'segredo-temporario-123'  // Usa secret do .env ou valor padrão
        );

        // Salva os dados do usuário decodificados na requisição
        // Para que as rotas seguintes possam acessar req.user
        req.user = decoded;

        // Passa para o próximo middleware ou controlador
        next();

    } catch (error) {
        // Token inválido, expirado ou malformado
        return res.status(403).json({           // 403 = Forbidden
            sucesso: false,
            mensagem: 'Token inválido ou expirado.'
        });
    }
};

// Exporta o middleware para ser usado nas rotas
module.exports = authMiddleware;