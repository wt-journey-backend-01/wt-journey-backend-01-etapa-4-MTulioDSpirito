const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  // Deleta todos os usuários existentes para evitar duplicação
  await knex('usuarios').del();

  // Senha de teste para o usuário 'agente@teste.com'
  const senhaDeTeste = 'Senha@123';
  const hashedPassword = await bcrypt.hash(senhaDeTeste, await bcrypt.genSalt(10));

  // Insere um usuário de teste
  await knex('usuarios').insert([
    { 
      nome: 'Agente de Teste', 
      email: 'agente@teste.com', 
      senha: hashedPassword 
    }
  ]);
};