import { HttpResponse } from '../protocols'
import { ServerError } from '../errors'

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
  },

  created (data: any = {}): HttpResponse {
    return {
      statusCode: 201,
      body: data
    }
  }
}
