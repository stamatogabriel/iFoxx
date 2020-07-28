'use strict'
const Type = use('App/Models/Type')

class TypeController {
  async index () {
    const types = Type.all()

    return types
  }

  async store ({ request }) {
    const data = request.all()

    const type = await Type.create(data)

    return type
  }

  async show ({ params }) {
    const type = await Type.findOrFail(params.id)

    return type
  }

  async update ({ params, request, response }) {
    const data = request.all()
    const type = await Type.findOrFail(params.id)

    type.merge(data)

    await type.save()

    return type
  }

  async destroy ({ params, request, response }) {
    const type = await Type.findOrFail(params.id)

    type.delete()
  }
}

module.exports = TypeController
