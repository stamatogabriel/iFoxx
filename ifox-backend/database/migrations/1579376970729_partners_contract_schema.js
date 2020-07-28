'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PartnersContractSchema extends Schema {
  up () {
    this.create('partners_contracts', (table) => {
      table.increments()
      table
        .integer('contract_id')
        .references('id')
        .inTable('contracts')
        .unsigned()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('partner_id')
        .references('id')
        .inTable('enterprises')
        .unsigned()
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('partners_contracts')
  }
}

module.exports = PartnersContractSchema
