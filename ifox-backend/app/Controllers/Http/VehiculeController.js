'use strict'
const Vehicule = use('App/Models/Vehicule')

class VehiculeController {
  async index ({ request, response, view }) {
    const vehicules = await Vehicule.all()

    return vehicules
  }

  async store ({ request, response }) {
    const data = request.all()
    const vehicule = await Vehicule.create(data)

    return vehicule
  }

  async show ({ params, request, response, view }) {
    const vehicule = await Vehicule.findOrFail(params.id)

    return vehicule
  }

  async update ({ params, request, response }) {
    const data = request.only(['license', 'truck_type', 'max_volume', 'notes'])
    const vehicule = await Vehicule.findOrFail(params.id)

    vehicule.merge(data)

    vehicule.save()

    return vehicule
  }

  async destroy ({ params, request, response }) {
    const vehicule = await Vehicule.findOrFail(params.id)

    vehicule.delete()
  }
}

module.exports = VehiculeController
