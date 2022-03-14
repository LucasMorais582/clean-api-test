import { HttpResponse } from '../protocols/HttpResponse'

export const HttpHelper = {
  badRequest (error: Error): HttpResponse {
    return {
      statusCode: 400,
      body: error
    }
  }
}
