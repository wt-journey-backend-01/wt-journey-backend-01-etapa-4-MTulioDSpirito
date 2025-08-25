const { z } = require('zod');

// Schema para a validação do registro de usuários
const registerSchema = z.object({
    nome: z.string().min(1, 'Nome é obrigatório.'),
    email: z.string().email('Email inválido.'),
    senha: z.string()
        .min(8, 'A senha deve ter no mínimo 8 caracteres.')
        .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula.')
        .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula.')
        .regex(/[0-9]/, 'A senha deve conter pelo menos um número.')
        .regex(/[^a-zA-Z0-9]/, 'A senha deve conter pelo menos um caractere especial.'),
});

// Schema para a validação do login
const loginSchema = z.object({
    email: z.string().email('Email inválido.'),
    senha: z.string().min(1, 'A senha é obrigatória.'),
});

module.exports = {
    registerSchema,
    loginSchema
};