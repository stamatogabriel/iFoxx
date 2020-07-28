'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContractDevolutionSchema extends Schema {
  up () {
    this.create('contract_devolutions', (table) => {
      table.increments()
      table
        .integer('contract_id')
        .references('id')
        .inTable('contracts')
        .unsigned()
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .double('volume')
        .unsigned()
        .notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('contract_devolutions')
  }
}

module.exports = ContractDevolutionSchema
