'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContractPayimentSchema extends Schema {
  up () {
    this.create('contract_payiments', (table) => {
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
        .double('value')
        .unsigned()
        .notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('contract_payiments')
  }
}

module.exports = ContractPayimentSchema
