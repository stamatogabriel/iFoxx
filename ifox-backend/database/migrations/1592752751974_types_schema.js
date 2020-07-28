'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TypesSchema extends Schema {
  up () {
    this.create('types', (table) => {
      table.increments()
      table.string('type').notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('types')
  }
}

module.exports = TypesSchema
