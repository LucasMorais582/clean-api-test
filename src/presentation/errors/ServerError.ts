export class ServerError extends Error {
  constructor () {
    super('An internal server error occurred')
    this.name = 'ServerError'
  }
}
