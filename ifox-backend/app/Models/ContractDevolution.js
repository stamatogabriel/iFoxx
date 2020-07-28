'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ContractDevolution extends Model {
  contracts () {
    return this.belongsTo('App/Models/Contract')
  }
}

module.exports = ContractDevolution
