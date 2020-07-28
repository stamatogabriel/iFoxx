'use strict'

const Schema = use('Schema')

class SellsSchema extends Schema {
  up () {
    this.create('sells', table => {
      table.increments()
      table
        .integer('contract_id')
        .references('id')
        .inTable('contracts')
        .unsigned()
        .onUpdate('CASCADE')
      table
        .integer('seller_id')
        .references('id')
        .inTable('sellers')
        .notNullable()
        .unsigned()
        .onUpdate('CASCADE')
      table
        .integer('client_id')
        .references('id')
        .inTable('enterprises')
        .unsigned()
        .onUpdate('CASCADE')
      table.double('sell_price')
      table.string('type_freigth')
      table.double('volume')
      table.double('profit')
      table.double('comission')
      table.timestamps()
    })
  }

  down () {
    this.drop('sells')
  }
}

module.exports = SellsSchema
