'use strict'
const Order = use('App/Models/Order')
const Sell = use('App/Models/Sell')
const Database = use('Database')

class OrderController {
  async index ({ params }) {
    const orders = await Order.query()
      .where('sell_id', params.sells_id)
      .fetch()

    return orders
  }

  async store ({ params, request, response }) {
    const data = request.all()
    const sell = await Sell.findOrFail(params.sells_id)

    if (Number(sell.volume) < Number(data.volume)) {
      return response.status(401).send({
        error: {
          message:
            'Volume da venda maior que o disponível na venda. Entre em contato com o administrador para saber mais'
        }
      })
    }

    const order = await Order.create({
      ...data,
      sell_id: params.sells_id
    })

    await Database.table('sells')
      .where('id', params.sells_id)
      .update('volume', Number(sell.volume) - Number(data.volume))

    return order
  }

  async show ({ params }) {
    const order = await Order.findOrFail(params.id)

    return order
  }

  async update ({ params, request, response }) {
    const sell = await Sell.findOrFail(params.sells_id)
    const order = await Order.findOrFail(params.id)

    const data = request.all()

    if (order.sell_id && order.sell_id !== params.sells_id) {
      await Database.table('sells')
        .where('id', order.sell_id)
        .update('volume', Number(sell.volume) + Number(order.volume))

      await Database.table('sells')
        .where('id', params.sells_id)
        .update('volume', Number(sell.volume) - Number(order.volume))
    }

    order.merge({ ...data, sell_id: params.sells_id })

    return order
  }

  async destroy ({ params }) {
    const order = await Order.findOrFail(params.id)
    const sell = await Sell.findOrFail(order.sell_id)

    await Database.table('sells')
      .where('id', params.sells_id)
      .update('volume', sell.volume + order.volume)

    order.delete()
  }
}

module.exports = OrderController
