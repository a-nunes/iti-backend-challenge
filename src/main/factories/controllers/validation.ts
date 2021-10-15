import { ValidationController } from '@/application/controllers'
import { setupPasswordValidation } from '@/domain/use-cases'
import { makePasswordValidator } from '@/main/factories/adapters/validator'

export const makeValidationController = (): ValidationController => {
  const passwordValidation = setupPasswordValidation(makePasswordValidator())
  return new ValidationController(passwordValidation)
}
