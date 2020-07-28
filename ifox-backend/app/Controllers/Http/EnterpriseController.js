'use strict'
const Enterprise = use('App/Models/Enterprise')

class EnterpriseController {
  async index () {
    const enterprises = await Enterprise.all()

    return enterprises
  }

  async store ({ request }) {
    const data = request.all()

    const enterprise = await Enterprise.create(data)

    return enterprise
  }

  async show ({ params }) {
    const enterprise = await Enterprise.findOrFail(params.id)

    return enterprise
  }

  async update ({ params, request }) {
    const data = request.all()

    const enterprise = await Enterprise.findOrFail(params.id)

    enterprise.merge(data)

    enterprise.save()

    return enterprise
  }

  async destroy ({ params }) {
    const enterprise = await Enterprise.findOrFail(params.id)

    enterprise.delete()
  }
}

module.exports = EnterpriseController
