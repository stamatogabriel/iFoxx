'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class EnterpriseType extends Model {
  enterprises () {
    return this.belongsToMany('App/Models/Enterprise')
  }

  types () {
    return this.belongsToMany('App/Models/Type')
  }
}

module.exports = EnterpriseType
