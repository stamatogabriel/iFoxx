'use strict'
const PartnersContract = use('App/Models/PartnersContract')

class PartnersContractController {
  async index ({ params }) {
    const partners = await PartnersContract
      .query()
      .where('contract_id', params.contracts_id)
      .fetch()

    return partners
  }

  async store ({ params, request }) {
    const data = request.only(['partner_id'])

    const partner = await PartnersContract.create({ ...data, contract_id: params.contracts_id })

    return partner
  }

  /* async show({ params, request, response, view }) {

    const partner = await PartnersContract.findOrFail(params.id)

    const partner
  } */

  /* async update ({ params, request, response }) {
    const data = request.only(['contract_id', 'partner_id'])

    const partner = await PartnersContract.findOrFail(params.id)

    partner.merge(data)

    partner.save()

    return partner
  } */

  async destroy ({ params }) {
    const partner = await PartnersContract.findOrFail(params.id)

    partner.delete()
  }
}

module.exports = PartnersContractController
