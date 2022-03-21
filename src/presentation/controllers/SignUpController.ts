import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'
import { InvalidParamError, MissingParamError } from '../errors'
import { HttpHelper } from '../helpers/HttpHelper'
import { AddAccount } from '../../domain/usecases/AddAccount'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredParams = ['name', 'email', 'password', 'passwordConfirmation']
      const { body } = httpRequest

      for (const param of requiredParams) {
        if (!body[param]) { return HttpHelper.badRequest(new MissingParamError(param)) }
      }

      const { name, email, password, passwordConfirmation } = body

      if (!this.emailValidator.isValid(email)) {
        return HttpHelper.badRequest(new InvalidParamError('email'))
      }

      if (password !== passwordConfirmation) {
        return HttpHelper.badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const account = await this.addAccount.add({ name, email, password })

      return HttpHelper.created(account)
    } catch (error) {
      // TODO: use the error object

      return HttpHelper.serverError()
    }
  }
}
