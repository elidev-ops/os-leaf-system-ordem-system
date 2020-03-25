exports.up = function (knex) {
  return knex.schema.createTable('os', function (table) {
    table.increments()
    table.string('condicao').notNullable()
    table.string('defeito').notNullable()
    table.string('acessorios').notNullable()
    table.string('solucao').notNullable()
    table.string('laudo').notNullable()
    table.string('garantia').notNullable()
    table.int('produto').notNullable()
    table.int('cliente').notNullable()
    table.float('valor').notNullable()
    table.foreign('produto')
      .references('id')
      .inTable('produto')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.foreign('cliente')
      .references('id')
      .inTable('cliente')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('os')
}