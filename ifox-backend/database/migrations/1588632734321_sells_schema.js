'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SellsSchema extends Schema {
  up () {
    this.alter('sells', (table) => {
      table.integer('group_id')
        .references('id')
        .inTable('enterprise_groups')
        .unsigned()
        .onUpdate('CASCADE')
    })
  }

  down () {
    this.table('sells', (table) => {
      table.dropColumn('group_id')
    })
  }
}

module.exports = SellsSchema
