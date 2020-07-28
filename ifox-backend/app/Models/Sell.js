'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sell extends Model {
  sellers () {
    return this.belongsTo('App/Models/Sellers')
  }

  contracts () {
    return this.belongsTo('App/Models/Contracts')
  }

  enterprises () {
    return this.belongsTo('App/Models/Enterprise')
  }

  orders () {
    return this.hasMany('App/Models/Order')
  }
}

module.exports = Sell
