'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PartnersContract extends Model {
  enterprises () {
    return this.hasMany('App/Models/Enterprise')
  }
}

module.exports = PartnersContract
