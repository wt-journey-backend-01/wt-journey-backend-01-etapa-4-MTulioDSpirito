const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuariosRepository = require('../repositories/usuariosRepository');
const { AppError } = require('../utils/errorHandler');
const { registerSchema, loginSchema } = require('../utils/authValidation');

// Função para gerar o token JWT
function generateAccessToken(user) {
    // Payload do token (informações do usuário a serem incluídas)
    const payload = {
        id: user.id,
        email: user.email
    };
    // Gera o token com uma chave secreta e tempo de expiração
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Lógica de registro de usuário
const register = async (req, res, next) => {
    try {
        const data = registerSchema.parse(req.body);
        const { nome, email, senha } = data;

        // Verifica se o email já existe
        const existingUser = await usuariosRepository.findByEmail(email);
        if (existingUser) {
            throw new AppError(400, 'Email já cadastrado.');
        }

        // Gera o hash da senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(senha, salt);

        // Cria o novo usuário no banco de dados
        const newUser = await usuariosRepository.create({
            nome,
            email,
            senha: hashedPassword
        });

        // Retorna o novo usuário criado (sem a senha)
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

// Lógica de login
const login = async (req, res, next) => {
    try {
        const data = loginSchema.parse(req.body);
        const { email, senha } = data;

        // Procura o usuário pelo email
        const user = await usuariosRepository.findByEmail(email);
        if (!user) {
            throw new AppError(401, 'Email ou senha incorretos.');
        }

        // Compara a senha fornecida com o hash no banco de dados
        const isMatch = await bcrypt.compare(senha, user.senha);
        if (!isMatch) {
            throw new AppError(401, 'Email ou senha incorretos.');
        }

        // Se as senhas baterem, gera e retorna o token JWT
        const token = generateAccessToken(user);
        res.status(200).json({ access_token: token });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login
};