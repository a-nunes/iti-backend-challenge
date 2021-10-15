import { RequiredFieldError } from '@/application/errors'
import { badRequest, HttpResponse, ok } from '@/application/helpers'
import { PasswordValidation } from '@/domain/use-cases'

export class ValidationController {
  constructor (private readonly validation: PasswordValidation) {}

  async handle (httpRequest: any): Promise<HttpResponse> {
    if (httpRequest.password === undefined || httpRequest.password === null) {
      return badRequest(new RequiredFieldError('password'))
    }
    const isValid = this.validation(httpRequest.password)
    return ok(isValid)
  }
}
