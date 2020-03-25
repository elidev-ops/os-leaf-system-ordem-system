exports.up = function (knex) {
  return knex.schema.createTable('endereco', function (table) {
    table.string('uf', 2).notNullable()
    table.string('city').notNullable()
    table.string('neighborhood').notNullable()
    table.string('street').notNullable()
    table.string('number').notNullable()
    table.int('id_cliente')
    table.foreign('id_cliente')
      .references('id')
      .inTable('cliente')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('endereco')
}