'use strict'

const Storage = use('App/Models/Storage')
class StorageController {
  async index ({ request, response, view }) {
    const storages = await Storage.all()

    return storages
  }

  async store ({ request, response }) {
    const data = request.all()

    const storage = await Storage.create(data)

    return storage
  }

  async show ({ params }) {
    const storage = await Storage.findOrFail(params.id)

    return storage
  }

  async update ({ params, request }) {
    const data = request.only(['name', 'street', 'number', 'neighborhood', 'city', 'uf', 'zipcode', 'contact', 'phone'])

    const storage = await Storage.findOrFail(params.id)

    storage.merge(data)

    storage.save()

    return storage
  }

  async destroy ({ params }) {
    const storage = await Storage.findOrFail(params.id)

    storage.delete()
  }
}

module.exports = StorageController
