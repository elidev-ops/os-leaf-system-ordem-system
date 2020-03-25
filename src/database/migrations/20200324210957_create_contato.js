
exports.up = function (knex) {
  return knex.schema.createTable('contato', function (table) {
    table.string('telephone').notNullable()
    table.string('whatsapp').notNullable()
    table.int('id_cliente').notNullable()
    table.foreign('id_cliente')
      .references('id')
      .inTable('cliente')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('contato')
}
