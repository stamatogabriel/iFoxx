'use strict'

const Order = use('App/Models/Order')
const Sell = use('App/Models/Sell')
const Database = use('Database')
class OrderListController {
  async index () {
    const orders = await Order.all()

    return orders
  }

  async store ({ request }) {
    const data = request.all()

    const order = await Order.create(data)

    return order
  }

  async show ({ params }) {
    const order = await Order.findOrFail(params.id)

    return order
  }

  async destroy ({ params }) {
    const order = await Order.findOrFail(params.id)
    const sell = await Sell.findOrFail(order.sell_id)

    await Database.table('sells')
      .where('id', order.sell_id)
      .update('volume', sell.volume + order.volume)

    order.delete()
  }
}

module.exports = OrderListController
