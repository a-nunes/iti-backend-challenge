import { RequiredFieldError } from '@/application/errors'
import { badRequest, HttpResponse, ok } from '@/application/helpers'
import { PasswordValidation } from '@/domain/use-cases'

type HttpRequest = { password: string }
type Model = Error | boolean
export class ValidationController {
  constructor (private readonly validation: PasswordValidation) {}

  async handle ({ password }: HttpRequest): Promise<HttpResponse<Model>> {
    if (password === undefined || password === null) {
      return badRequest(new RequiredFieldError('password'))
    }
    const isValid = this.validation({ password })
    return ok(isValid)
  }
}
