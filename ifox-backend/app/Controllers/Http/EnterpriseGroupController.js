'use strict'

const EnterpriseGroup = use('App/Models/EnterpriseGroup')

class EnterpriseGroupController {
  async index () {
    const groups = await EnterpriseGroup
      .query()
      .with('enterprises')
      .fetch()

    return groups
  }

  async store ({ request }) {
    const data = request.all()

    const group = await EnterpriseGroup.create(data)

    return group
  }

  async show ({ params }) {
    const group = await EnterpriseGroup.findOrFail(params.id)

    await group.loadMany(['enterprises'])

    return group
  }

  async update ({ params, request, response }) {
    const group = await EnterpriseGroup.findOrFail(params.id)

    const data = request.only(['name'])

    group.name = data

    return group
  }

  async destroy ({ params, request, response }) {
    const group = await EnterpriseGroup.findOrFail(params.id)

    group.delete()
  }
}

module.exports = EnterpriseGroupController
