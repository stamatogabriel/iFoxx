'use strict'
const ContractPayiment = use('App/Models/ContractPayiment')
const Contract = use('App/Models/Contract')
const Database = use('Database')

class ContractPayimentController {
  async index ({ params }) {
    const payiments = await ContractPayiment
      .query()
      .where('contract_id', params.contracts_id)
      .fetch()

    return payiments
  }

  async store ({ params, request, response }) {
    const data = request.only(['value'])
    const contract = await Contract.findOrFail(params.contracts_id)

    if (parseFloat(contract.to_pay) < parseFloat(data.value)) {
      return response.status(401).send({ error: { message: 'O valor para pagamento é maior que o que falta pagar do contrato' } })
    }

    await Database.table('contracts')
      .where('id', params.contracts_id)
      .update('to_pay', parseFloat(contract.to_pay) - parseFloat(data.value))
      .update('to_load', parseFloat(contract.to_load) + parseFloat(data.value / contract.unitary_price))
      .update('paied', parseFloat(contract.paied) + parseFloat(data.value))

    const payiment = await ContractPayiment.create({ ...data, contract_id: params.contracts_id })

    return payiment
  }

  async show ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
    const payiment = await ContractPayiment.findOrFail(params.id)

    const contract = await Contract.findOrFail(params.contracts_id)

    await Database.table('contracts')
      .where('id', params.contracts_id)
      .update('to_pay', Number(contract.to_pay) + Number(payiment.value))
      .update('to_load', Number(contract.to_load) - Number(payiment.value / contract.unitary_price))
      .update('paied', Number(contract.paied) - Number(payiment.value))

    payiment.delete()
  }
}

module.exports = ContractPayimentController
