import { HttpRequest } from '../protocols/HttpRequest'
import { HttpResponse } from '../protocols/HttpResponse'
import { MissingParamError } from '../errors/MissingParamError'
import { HttpHelper } from '../helpers/HttpHelper'
import { Controller } from '../protocols/Controller'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredParams = ['name', 'email']

    for (const param of requiredParams) {
      if (!httpRequest.body[param]) {
        return HttpHelper.badRequest(new MissingParamError(param))
      }
    }

    return {
      statusCode: 200,
      body: {}
    }
  }
}
