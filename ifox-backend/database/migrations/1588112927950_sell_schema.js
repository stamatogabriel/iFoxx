'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SellSchema extends Schema {
  up () {
    this.alter('sells', (table) => {
      table.string('freigth')
    })
  }

  down () {
    this.table('sells', (table) => {
      table.dropColumn('freigth')
    })
  }
}

module.exports = SellSchema
