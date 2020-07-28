'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnterpriseGroupSchema extends Schema {
  up () {
    this.create('enterprise_groups', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('enterprise_groups')
  }
}

module.exports = EnterpriseGroupSchema
