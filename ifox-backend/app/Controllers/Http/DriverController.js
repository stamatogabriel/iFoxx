'use strict'
const Driver = use('App/Models/Driver')

class DriverController {
  async index () {
    const drivers = await Driver.all()

    return drivers
  }

  async store ({ request }) {
    const data = request.all()

    const driver = await Driver.create(data)

    return driver
  }

  async show ({ params }) {
    const driver = await Driver.findOrFail(params.id)

    return driver
  }

  async update ({ params, request }) {
    const data = request.only(['name', 'cpf', 'rg', 'cnh', 'cnh_category', 'phone'])

    const driver = await Driver.findOrFail(params.id)

    driver.merge(data)

    driver.save()

    return driver
  }

  async destroy ({ params }) {
    const driver = await Driver.findOrFail(params.id)

    driver.delete()
  }
}

module.exports = DriverController
