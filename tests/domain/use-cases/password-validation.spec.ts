import { mock, MockProxy } from 'jest-mock-extended'

interface PasswordValidator {
  validate(input: PasswordValidator.Input): PasswordValidator.Output
}

namespace PasswordValidator {
  export type Input = { password: string }
  export type Output = boolean
}

type Input = { password: string }
type PasswordValidation = (input: Input) => boolean
type Setup = (validator: PasswordValidator) => PasswordValidation

export const setupPasswordValidation: Setup = validator => ({ password }) => {
  const blacklistRegex = /[_|~=`{}[\]:";'<>?,./ ]/g
  const hasBlacklistSymbol = password.match(blacklistRegex)
  if (hasBlacklistSymbol || password.length < 9) {
    return false
  }
  return validator.validate({ password })
}

describe('PasswordValidation', () => {
  let passwordValidator: MockProxy<PasswordValidator>
  let password: string
  let sut: PasswordValidation

  beforeAll(() => {
    passwordValidator = mock()
    password = 'validPassword'
  })

  beforeEach(() => {
    sut = setupPasswordValidation(passwordValidator)
  })

  it('should call PasswordValidator with correct params', () => {
    sut({ password })

    expect(passwordValidator.validate).toHaveBeenCalledWith({ password })
    expect(passwordValidator.validate).toHaveBeenCalledTimes(1)
  })

  it('should return false if containing blacklist symbols', () => {
    const output = sut({ password: 'blacklist_{symbol' })

    expect(output).toBe(false)
  })

  it('should return false if length lesser than 9', () => {
    const output = sut({ password: 'less9' })

    expect(output).toBe(false)
  })
})
