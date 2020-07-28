'use strict'
const Route = use('Route')

Route.post('users', 'UserController.store')
Route.post('sessions', 'SessionController.store')
Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')

Route.group(() => {
  Route.get('users', 'UserController.index')
  Route.get('users/:id', 'UserController.show')
  Route.put('users/:id', 'UserController.update')
  Route.delete('users/:id', 'UserController.destroy')

  Route.resource('drivers', 'DriverController').apiOnly()
  Route.resource('enterprises', 'EnterpriseController').apiOnly()
  Route.resource('types', 'TypeController').apiOnly()
  Route.resource('enterprise_types', 'EnterpriseTypeController').apiOnly()
  Route.resource('groups', 'EnterpriseGroupController').apiOnly()
  Route.resource('products', 'ProductController').apiOnly()
  Route.resource('sellers', 'SellerController').apiOnly()
  Route.resource('storages', 'StorageController').apiOnly()
  Route.resource('vehicules', 'VehiculeController').apiOnly()
  Route.resource('orders', 'OrderListController').apiOnly()

  Route.resource('contracts', 'ContractController').apiOnly()
  Route.resource('contracts.partners', 'PartnersContractController').apiOnly()
  Route.resource('contracts.sells', 'SellController').apiOnly()
  Route.resource('contracts.payiment', 'ContractPayimentController').apiOnly()
  Route.resource('contracts.devolution', 'ContractDevolutionController').apiOnly()
  Route.resource('contracts.sells.orders', 'OrderController').apiOnly()

  Route.resource('sells', 'SellListController').apiOnly()
}).middleware('auth')
