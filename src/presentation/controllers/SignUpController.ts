import { HttpRequest } from '../protocols/HttpRequest'
import { HttpResponse } from '../protocols/HttpResponse'
import { MissingParamError } from '../errors/MissingParamError'
import { HttpHelper } from '../helpers/HttpHelper'
import { Controller } from '../protocols/Controller'
import { EmailValidator } from '../protocols/EmailValidator'
import { InvalidParamError } from '../errors/InvalidParamError'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredParams = ['name', 'email', 'password', 'passwordConfirmation']
    const { body } = httpRequest

    for (const param of requiredParams) {
      if (!body[param]) {
        return HttpHelper.badRequest(new MissingParamError(param))
      }
    }

    const isEmailValid = this.emailValidator.isValid(body.email)

    if (!isEmailValid) {
      return HttpHelper.badRequest(new InvalidParamError('email'))
    }

    return {
      statusCode: 200,
      body: {}
    }
  }
}
