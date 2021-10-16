import { PasswordValidator } from '@/domain/contracts'
import { PasswordValidation, setupPasswordValidation } from '@/domain/use-cases'

import { mock, MockProxy } from 'jest-mock-extended'

describe('PasswordValidation', () => {
  let passwordValidator: MockProxy<PasswordValidator>
  let password: string
  let sut: PasswordValidation

  beforeAll(() => {
    passwordValidator = mock()
    passwordValidator.isValid.mockImplementation(() => true)
    password = 'valid%pAsSworD'
  })

  beforeEach(() => {
    sut = setupPasswordValidation(passwordValidator)
  })

  it('should call PasswordValidator with correct params', () => {
    sut({ password })

    expect(passwordValidator.isValid).toHaveBeenCalledWith({ password })
    expect(passwordValidator.isValid).toHaveBeenCalledTimes(1)
  })

  it('should return false if containing blacklist symbols', () => {
    const output = sut({ password: 'blacklist_{symbol' })

    expect(output).toBe(false)
  })

  it('should return false if length lesser than 9', () => {
    const output = sut({ password: 'less9' })

    expect(output).toBe(false)
  })

  it('should return true if length equals 9', () => {
    const output = sut({ password: 'hasNineS9' })

    expect(output).toBe(true)
  })

  it('should return false if is not unique', () => {
    const output = sut({ password: 'AbTp9!foA' })

    expect(output).toBe(false)
  })
})
