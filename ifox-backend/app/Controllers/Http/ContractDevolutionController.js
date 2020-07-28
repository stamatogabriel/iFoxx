'use strict'
const ContractDevolution = use('App/Models/ContractDevolution')
const Contract = use('App/Models/Contract')
const Database = use('Database')

class ContractDevolutionController {
  async index ({ params }) {
    const devolution = await ContractDevolution
      .query()
      .where('contract_id', params.contracts_id)
      .fetch()

    return devolution
  }

  async store ({ request, response, params }) {
    const data = request.only(['volume'])

    const contract = await Contract.findOrFail(params.contracts_id)

    if (contract.to_load < data) {
      return response.status(401).send({ error: { message: 'Volume da devolução é maior que o volume que resta no contrato' } })
    }

    await Database.table('contracts')
      .where('id', params.contracts_id)
      .update('to_load', 0)
      .update('open', false)

    const devolution = await ContractDevolution.create({ ...data, contract_id: params.contracts_id })

    return devolution
  }

  /**
   * Display a single contractdevolution.
   * GET contractdevolutions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing contractdevolution.
   * GET contractdevolutions/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update contractdevolution details.
   * PUT or PATCH contractdevolutions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a contractdevolution with id.
   * DELETE contractdevolutions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ContractDevolutionController
