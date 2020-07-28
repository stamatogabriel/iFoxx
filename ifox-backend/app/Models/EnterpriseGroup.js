'use strict'
const Model = use('Model')

class EnterpriseGroup extends Model {
  enterprises () {
    return this.hasMany('App/Models/Enterprise')
  }
}

module.exports = EnterpriseGroup
