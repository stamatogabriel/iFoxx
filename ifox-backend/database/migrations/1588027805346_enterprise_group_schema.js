'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnterpriseGroupSchema extends Schema {
  up () {
    this.create('enterprise_groups', (table) => {
      table.increments()
      table.string('name').notNullable().unique()
      table.string('street', 50).notNullable()
      table.string('number').notNullable()
      table.string('neighborhood', 50).notNullable()
      table.string('complement', 50)
      table.string('city', 40).notNullable()
      table.string('uf', 2).notNullable()
      table.string('zipcode', 10).notNullable()
      table.string('phone', 15).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('enterprise_groups')
  }
}

module.exports = EnterpriseGroupSchema
