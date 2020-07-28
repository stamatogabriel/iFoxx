'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Type extends Model {
  enterprise_types () {
    return this.hasMany('App/Models/EnterpriseType')
  }
}

module.exports = Type
