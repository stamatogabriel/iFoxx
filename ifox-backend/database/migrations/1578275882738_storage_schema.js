'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StorageSchema extends Schema {
  up () {
    this.create('storages', (table) => {
      table.increments()
      table.string('name', 50).notNullable().unique()
      table.string('street', 50)
      table.integer('number')
      table.string('neighborhood', 50)
      table.string('city', 40)
      table.string('uf', 2)
      table.string('zipcode', 10)
      table.string('contact', 50)
      table.string('phone', 15)
      table.string('scheduling_time')
      table.string('notes')
      table.string('type').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('storages')
  }
}

module.exports = StorageSchema
