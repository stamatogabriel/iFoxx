'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.alter('orders', (table) => {
      table.integer('client_id')
        .references('id')
        .inTable('enterprises')
        .unsigned()
        .onUpdate('CASCADE')
    })
  }

  down () {
    this.table('orders', (table) => {
      table.dropColumn('client_id')
    })
  }
}

module.exports = OrderSchema
