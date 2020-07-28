'use strict'
const moment = require('moment')
const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
  async store ({ request, response }) {
    const email = request.input('email')

    try {
      const user = await User.findByOrFail('email', email)

      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()

      await user.save()

      await Mail.send(
        ['email.forgot_password'],
        { email, token: user.token, link: `${request.input('redirect_url')}?token=${user.token}` },
        message => {
          message
            .to(user.email)
            .from('stamato7@gmail.com', 'Gabriel | Eu mesmo')
            .subject('Recuperação de senha')
        }
      )
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: `Algo não deu certo. O email ${email} não está cadastrado` } })
    }
  }

  async update ({ request, response }) {
    try {
      const { token, password } = request.all()

      const user = await User.findByOrFail('token', token)

      const tokenExpired = moment()
        .subtract('2', 'days')
        .isAfter(user.token_created_at)

      if (tokenExpired) {
        return response
          .status(401)
          .send({ message: { error: 'O token de recuperação está expirado.' } })
      }

      user.token = null
      user.token_created_at = null
      user.password = password

      await user.save()

      return user
    } catch (err) {
      return response
        .status(err.status)
        .send({ message: { error: 'Algo deu errado ao resetar sua senha.' } })
    }
  }
}

module.exports = ForgotPasswordController
