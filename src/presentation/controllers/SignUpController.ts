import { HttpRequest } from '../protocols/HttpRequest'
import { HttpResponse } from '../protocols/HttpResponse'
import { MissingParamError } from '../errors/MissingParamError'
import { HttpHelper } from '../helpers/HttpHelper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return HttpHelper.badRequest(new MissingParamError('name'))
    }

    return HttpHelper.badRequest(new MissingParamError('email'))
  }
}
