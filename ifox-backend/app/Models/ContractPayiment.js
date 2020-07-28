'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ContractPayiment extends Model {
  contracts () {
    return this.belongsTo('App/Models/Contract')
  }
}

module.exports = ContractPayiment
