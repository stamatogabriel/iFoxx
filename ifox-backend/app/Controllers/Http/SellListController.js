'use strict'
const Sell = use('App/Models/Sell')
const Contract = use('App/Models/Contract')
const Database = use('Database')

class SellListController {
  async index () {
    const sells = await Sell.all()

    return sells
  }

  async store ({ request }) {
    const data = request.all()

    const sell = await Sell.create(data)

    return sell
  }

  async show ({ params }) {
    const sell = await Sell.findOrFail(params.id)

    return sell
  }

  async update ({ request, params, response }) {
    const data = request.only(['contract_id'])
    const sell = await Sell.findOrFail(params.id)
    const contract = await Contract.findOrFail(data.contract_id)

    if (sell.volume > contract.to_load) {
      return response.send({
        error: {
          message: 'O volume da venda é maior que o disponível em contrato.'
        }
      })
    } else {
      await Database.table('contracts')
        .where('id', sell.contract_id)
        .update('to_load', parseInt(contract.to_load) - parseInt(sell.volume))

      sell.merge(data)

      sell.save()

      return sell
    }
  }

  async destroy ({ params }) {
    const sell = await Sell.findOrFail(params.id)
    const contract = await Contract.findOrFail(sell.contract_id)

    await Database.table('contracts')
      .where('id', sell.contract_id)
      .update('to_load', parseInt(contract.to_load) + parseInt(sell.volume))

    sell.delete()
  }
}

module.exports = SellListController
