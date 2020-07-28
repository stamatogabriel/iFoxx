'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContractSchema extends Schema {
  up () {
    this.create('contracts', table => {
      table.increments()
      table
        .integer('storage_id')
        .references('id')
        .inTable('storages')
        .notNullable()
        .unsigned()
        .onUpdate('CASCADE')
      table.string('contract_number')
      table
        .integer('enterprise_id')
        .references('id')
        .inTable('enterprises')
        .notNullable()
        .unsigned()
        .onUpdate('CASCADE')
      table
        .integer('product_id')
        .references('id')
        .inTable('products')
        .notNullable()
        .unsigned()
        .onUpdate('CASCADE')
      table.double('volume').notNullable()
      table.double('unitary_price').notNullable()
      table.double('to_pay')
      table.double('to_load')
      table.double('paied')
      table.double('spread')
      table.double('brokerage')
      table.double('storage_cust')
      table.double('freight')
      table.double('total_cust')
      table.boolean('owner')
      table.double('total').notNullable()
      table.string('notes')
      table.boolean('open')
      table.timestamps()
    })
  }

  down () {
    this.drop('contracts')
  }
}

module.exports = ContractSchema
