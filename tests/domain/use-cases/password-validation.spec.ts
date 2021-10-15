import { mock, MockProxy } from 'jest-mock-extended'

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

export const setupPasswordValidation: Setup = validator => ({ password }) => {
  validator.validate({ password })
}

describe('PasswordValidation', () => {
  let passwordValidator: MockProxy<PasswordValidator>
  let password: string
  let sut: PasswordValidation

  beforeAll(() => {
    passwordValidator = mock()
    password = 'any_password'
  })

  beforeEach(() => {
    sut = setupPasswordValidation(passwordValidator)
  })

  it('should call PasswordValidator with correct params', () => {
    sut({ password })

    expect(passwordValidator.validate).toHaveBeenCalledWith({ password })
    expect(passwordValidator.validate).toHaveBeenCalledTimes(1)
  })
})
