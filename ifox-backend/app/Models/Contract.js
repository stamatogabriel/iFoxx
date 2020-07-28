'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Contract extends Model {
  storages () {
    return this.belongsTo('App/Models/Storage')
  }

  products () {
    return this.belongsTo('App/Models/Product')
  }

  enterprises () {
    return this.belongsTo('App/Models/Enterprise')
  }

  partners_contracts () {
    return this.hasMany('App/Models/PartnersContract')
  }

  sells () {
    return this.hasMany('App/Models/Sell')
  }

  contract_payiments () {
    return this.hasMany('App/Models/Sell')
  }
}

module.exports = Contract
