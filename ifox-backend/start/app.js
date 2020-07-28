'use strict'

const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  '@adonisjs/mail/providers/MailProvider',
  '@adonisjs/framework/providers/ViewProvider'
]

const aceProviders = [
  '@adonisjs/lucid/providers/MigrationsProvider'
]

const aliases = {}

const commands = []

module.exports = { providers, aceProviders, aliases, commands }
