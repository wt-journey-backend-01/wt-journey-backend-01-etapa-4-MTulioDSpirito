const db = require('../db/db');
const { AppError } = require('../utils/errorHandler');

async function findByEmail(email) {
    try {
        // Encontra um usuário pelo email
        return await db('usuarios').where({ email }).first();
    } catch (error) {
        throw new AppError(500, 'Erro ao buscar usuário por email', [error.message]);
    }
}

async function findById(id) {
    try {
        // Encontra um usuário pelo ID, ignorando a senha por segurança
        return await db('usuarios').where({ id }).select('id', 'nome', 'email').first();
    } catch (error) {
        throw new AppError(500, 'Erro ao buscar usuário por ID', [error.message]);
    }
}

async function create(data) {
    try {
        const [usuario] = await db('usuarios').insert(data).returning('*');
        // Retorna o novo usuário, mas sem a senha
        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        };
    } catch (error) {
        throw new AppError(500, 'Erro ao criar usuário', [error.message]);
    }
}

async function remove(id) {
    try {
        // Deleta o usuário pelo ID
        const deleted = await db('usuarios').where({ id }).del();
        return deleted > 0;
    } catch (error) {
        throw new AppError(500, 'Erro ao deletar usuário', [error.message]);
    }
}

module.exports = {
    findByEmail,
    findById,
    create,
    remove
};