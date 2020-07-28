'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnterpriseSchema extends Schema {
  up () {
    this.alter('enterprises', (table) => {
      table.integer('enterprise_group_id')
        .references('id')
        .inTable('enterprise_groups')
        .unsigned()
        .onUpdate('CASCADE')
    })
  }

  down () {
    this.table('enterprises', (table) => {
      table.dropColumn('enterprise_group_id')
    })
  }
}

module.exports = EnterpriseSchema
