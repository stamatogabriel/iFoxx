'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnterprisesSchema extends Schema {
  up () {
    this.create('enterprises', (table) => {
      table.increments()
      table.string('corporate_name', 50).notNullable()
      table.string('cnpj', 18).notNullable().unique()
      table.string('ie', 20).notNullable().unique()
      table.string('street', 50).notNullable()
      table.integer('number').notNullable()
      table.string('neighborhood', 50).notNullable()
      table.string('complement', 50)
      table.string('city', 40).notNullable()
      table.string('uf', 2).notNullable()
      table.string('zipcode', 10).notNullable()
      table.string('contact', 50).notNullable()
      table.string('phone', 15).notNullable()
      table.string('cellphone', 15).notNullable()
      table.string('type', 15)
      table.string('notes')
      table.timestamps()
    })
  }

  down () {
    this.drop('enterprises')
  }
}

module.exports = EnterprisesSchema
