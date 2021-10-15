import { PasswordValidation } from '@/domain/use-cases'

type HttpResponse = {
  statusCode: number,
  data: any
}

export class ValidationController {
  constructor (private readonly validation: PasswordValidation) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
    if (httpRequest.password === undefined || httpRequest.password === null) {
      return {
        statusCode: 400,
        data: new Error('Bad Request')
      }
    }
    const isValid = this.validation(httpRequest.password)
    return {
      statusCode: 200,
      data: isValid
    }
  }
}
