const jwt = require('jsonwebtoken');
const { AppError } = require('../utils/errorHandler');

// Middleware para verificar se o token JWT é válido
function authenticateToken(req, res, next) {
    // Pega o token do header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: Bearer TOKEN

    if (token == null) {
        // Se não houver token, retorna 401 Unauthorized
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // Se o token for inválido, retorna 403 Forbidden
            return res.status(403).json({ message: 'Token inválido.' });
        }
        // Adiciona os dados do usuário ao objeto de requisição
        req.user = user;
        next(); // Continua para a próxima função de middleware ou rota
    });
}

module.exports = { authenticateToken };