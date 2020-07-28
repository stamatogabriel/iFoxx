'use strict'

const EnterpriseType = use('App/Models/EnterpriseType')

class EnterpriseTypeController {
  async index ({ request, response, view }) {
    const enterpriseTypes = EnterpriseType.all()

    return enterpriseTypes
  }

  async store ({ request, response }) {
    const data = request.all()

    const enterpriseType = await EnterpriseType.create(data)

    return enterpriseType
  }

  async show ({ params, request, response, view }) {
    const enterprise = await EnterpriseType.findOrFail(params.id)

    return enterprise
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
    const enterprise = await EnterpriseType.findOrFail(params.id)

    enterprise.delete()
  }
}

module.exports = EnterpriseTypeController
