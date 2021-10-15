import { ValidatorAdapter } from '@/infra/adapters'
import { PasswordValidator } from '@/domain/contracts'

export const makePasswordValidator = (): PasswordValidator => {
  return new ValidatorAdapter()
}
