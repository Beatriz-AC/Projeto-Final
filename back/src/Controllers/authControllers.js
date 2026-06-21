const express = require('express');        // Importa o framework Express
const jwt = require('jsonwebtoken');       // Biblioteca para gerar e verificar JSON Web Tokens (JWT)
const cors = require('cors');              // Middleware para permitir requisições de outros domínios
const path = require('path');              // Módulo nativo do Node para trabalhar com caminhos de arquivos

// ====================== FUNÇÃO DE LOGIN ======================
const login = async (req, res) => {
    const { email, password } = req.body;   // Extrai email e senha do corpo da requisição

    console.log('🔐 Tentativa de login:', email); // Log para facilitar debug durante desenvolvimento

    // ====================== VALIDAÇÃO BÁSICA ======================
    if (!email || !password) {
        return res.status(400).json({           // 400 = Bad Request
            sucesso: false,
            mensagem: 'E-mail e senha são obrigatórios.'
        });
    }

    // ====================== VERIFICAÇÃO DE CREDENCIAIS ======================
    // Compara com as credenciais definidas no arquivo .env
    if (email === process.env.AUTH_USER && password === process.env.AUTH_PASSWORD) {
        
        // Gera o token JWT
        const token = jwt.sign(
            { 
                email: email, 
                nome: "Administrador" 
            }, 
            process.env.JWT_SECRET || 'segredo-temporario-123',  // Usa secret do .env ou um padrão
            { expiresIn: '24h' }                                 // Token expira em 24 horas
        );

        console.log('✅ Login bem-sucedido');

        // Resposta de sucesso
        return res.json({
            sucesso: true,
            mensagem: 'Login bem-sucedido.',
            token: token
        });
    } else {
        // Resposta de falha (credenciais erradas)
        return res.status(401).json({           // 401 = Unauthorized
            sucesso: false,
            mensagem: 'Email ou senha incorretos.'
        });
    }
};

// ====================== FUNÇÃO PARA VALIDAR TOKEN ======================
// Usada para verificar se o token ainda é válido (geralmente chamada em rotas protegidas)
const validarToken = (req, res) => {
    res.json({ 
        sucesso: true, 
        mensagem: 'Token válido.' 
    });
};

// ====================== EXPORTAÇÃO DAS FUNÇÕES ======================
// Permite que essas funções sejam importadas em outros arquivos (ex: routes/auth.js)
module.exports = { login, validarToken };