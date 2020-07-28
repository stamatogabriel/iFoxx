'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
  contracts () {
    return this.hasMany('App/Models/Contract')
  }
}

module.exports = Product
