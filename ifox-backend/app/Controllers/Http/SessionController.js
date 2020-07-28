'use strict'
const Database = use('Database')

class SessionController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)

    const responseUser = await Database.table('users')
      .where('email', email)

    const user = responseUser[0]

    return { token, user }
  }
}

module.exports = SessionController
