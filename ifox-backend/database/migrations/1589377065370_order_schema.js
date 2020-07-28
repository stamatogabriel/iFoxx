'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table.string('oc_number').notNullable()
      table.integer('id_driver').references('id').inTable('drivers').notNullable().unsigned().onUpdate('CASCADE')
      table.integer('id_truck').references('id').inTable('vehicules').notNullable().unsigned().onUpdate('CASCADE')
      table.integer('id_first_chart').references('id').inTable('vehicules').unsigned().onUpdate('CASCADE')
      table.integer('id_second_chart').references('id').inTable('vehicules').unsigned().onUpdate('CASCADE')
      table.double('volume').notNullable()
      table.integer('sell_id').references('id').inTable('sells').unsigned().notNullable().onUpdate('CASCADE')
      table.double('freight')
      table.string('notes')
      table.timestamps()
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrderSchema
