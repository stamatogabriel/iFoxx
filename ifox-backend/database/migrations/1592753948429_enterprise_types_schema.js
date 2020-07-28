'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EnterpriseTypesSchema extends Schema {
  up () {
    this.create('enterprise_types', table => {
      table.increments()
      table
        .integer('type_id')
        .notNullable()
        .references('id')
        .inTable('types')
        .unsigned()
        .onUpdate('CASCADE')
      table
        .integer('enterprise_id')
        .notNullable()
        .references('id')
        .inTable('enterprises')
        .unsigned()
        .onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('enterprise_types')
  }
}

module.exports = EnterpriseTypesSchema
