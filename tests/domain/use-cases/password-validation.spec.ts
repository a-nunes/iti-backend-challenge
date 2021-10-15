import { mock } from 'jest-mock-extended'

interface PasswordValidator {
  validate(input: PasswordValidator.Input): PasswordValidator.Output
}

namespace PasswordValidator {
  export type Input = { password: string }
  export type Output = boolean
}

type Input = { password: string }
type PasswordValidation = (input: Input) => void
type Setup = (validator: PasswordValidator) => PasswordValidation

export const setupPasswordValidation: Setup = validator => ({ password }): void => {
  validator.validate({ password })
}

describe('PasswordValidation', () => {
  it('should call PasswordValidator with correct params', () => {
    const passwordValidator = mock<PasswordValidator>()
    const sut = setupPasswordValidation(passwordValidator)
    sut({ password: 'any_password' })

    expect(passwordValidator.validate).toHaveBeenCalledWith({ password: 'any_password' })
    expect(passwordValidator.validate).toHaveBeenCalledTimes(1)
  })
})
