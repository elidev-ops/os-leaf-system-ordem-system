exports.up = function (knex) {
  return knex.schema.createTable('cliente', function (table) {
    table.increments()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('cpf').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('cliente')
}