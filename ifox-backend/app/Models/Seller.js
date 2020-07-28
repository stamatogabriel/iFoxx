'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Seller extends Model {
  sells () {
    return this.belongsToMany('App/Models/Sells')
  }
}

module.exports = Seller
