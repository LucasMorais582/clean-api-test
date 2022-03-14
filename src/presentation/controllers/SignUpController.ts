import { HttpRequest } from '../protocols/HttpRequest'
import { HttpResponse } from '../protocols/HttpResponse'
import { MissingParamError } from '../errors/MissingParamError'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }

    return {
      statusCode: 400,
      body: new MissingParamError('email')
    }
  }
}
