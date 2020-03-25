exports.up = function (knex) {
  return knex.schema.createTable('produto', function (table) {
    table.increments()
    table.string('type').notNullable()
    table.string('brand').notNullable()
    table.string('model').notNullable()
    table.string('sn').notNullable()
    table.int('cliente').notNullable()
    table.foreign('cliente')
      .references('id')
      .inTable('cliente')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('produto')
}