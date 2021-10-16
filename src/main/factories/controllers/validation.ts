import { makePasswordValidator } from '@/main/factories/adapters'
import { ValidationController } from '@/application/controllers'
import { setupPasswordValidation } from '@/domain/use-cases'

export const makeValidationController = (): ValidationController => {
  const passwordValidation = setupPasswordValidation(makePasswordValidator())
  return new ValidationController(passwordValidation)
}
