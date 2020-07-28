'use strict'
const Seller = use('App/Models/Seller')

class SellerController {
  async index () {
    const sellers = await Seller.all()

    return sellers
  }

  async store ({ request }) {
    const data = request.all()

    const seller = await Seller.create(data)

    return seller
  }

  async show ({ params }) {
    const seller = await Seller.findOrFail(params.id)

    return seller
  }

  async update ({ params, request }) {
    const seller = await Seller.findOrFail(params.id)

    const data = request.only([
      'name',
      'cpf',
      'phone',
      'cellphone'
    ])

    seller.merge(data)

    seller.save()

    return seller
  }

  async destroy ({ params, request, response }) {
    const seller = await Seller.findOrFail(params.id)

    seller.delete()
  }
}

module.exports = SellerController
