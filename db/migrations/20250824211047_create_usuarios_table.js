exports.up = async function (knex) {
  await knex.schema.createTable('usuarios', (table) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('email').notNullable().unique(); // O email deve ser único
    table.string('senha').notNullable(); // A senha será armazenada com hash
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('usuarios');
};