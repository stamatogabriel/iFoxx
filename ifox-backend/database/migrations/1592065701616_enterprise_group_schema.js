'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnterpriseGroupSchema extends Schema {
  up () {
    this.alter('enterprise_groups', (table) => {
      table.string('street', 50).notNullable()
      table.integer('number').notNullable()
      table.string('neighborhood', 50).notNullable()
      table.string('complement', 50)
      table.string('city', 40).notNullable()
      table.string('uf', 2).notNullable()
      table.string('zipcode', 10).notNullable()
      table.string('phone', 15).notNullable()
    })
  }

  down () {
    this.table('enterprise_groups', (table) => {
      table.dropColumn('street')
      table.dropColumn('number')
      table.dropColumn('neighborhood')
      table.dropColumn('complement')
      table.dropColumn('city')
      table.dropColumn('uf')
      table.dropColumn('zipcode')
      table.dropColumn('phone')
    })
  }
}

module.exports = EnterpriseGroupSchema
