import { PasswordValidator } from '@/domain/contracts'

import validator from 'validator'

export class ValidatorAdapter implements PasswordValidator {
  isValid ({ password }: PasswordValidator.Input): PasswordValidator.Output {
    const options = { minLength: 9, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }
    return validator.isStrongPassword(password, options)
  }
}
