import { HttpResponse } from '../protocols/HttpResponse'
import { ServerError } from '../errors/ServerError'

export const HttpHelper = {
  badRequest (error: Error): HttpResponse {
    return {
      statusCode: 400,
      body: error
    }
  },

  serverError (): HttpResponse {
    return {
      statusCode: 500,
      body: new ServerError()
    }
  }
}
