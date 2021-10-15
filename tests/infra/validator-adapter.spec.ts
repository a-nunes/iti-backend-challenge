import { PasswordValidator } from '@/domain/contracts'

import validator from 'validator'

jest.mock('validator')

export class ValidatorAdapter implements PasswordValidator {
  isValid ({ password }: PasswordValidator.Input): PasswordValidator.Output {
    return validator.isStrongPassword(password, { minLength: 9 })
  }
}

describe('ValidatorAdapter', () => {
  let password: string
  let fakeValidator: jest.Mocked<typeof validator>
  let sut: ValidatorAdapter

  beforeAll(() => {
    password = 'valid_password'
    fakeValidator = validator as jest.Mocked<typeof validator>
    fakeValidator.isStrongPassword.mockImplementation(() => true)
  })

  beforeEach(() => {
    sut = new ValidatorAdapter()
  })

  it('should call isStrongPassword with correct params', () => {
    sut.isValid({ password })

    expect(fakeValidator.isStrongPassword).toHaveBeenCalledWith(password, { minLength: 9 })
    expect(fakeValidator.isStrongPassword).toHaveBeenCalledTimes(1)
  })

  it('should return true on success', () => {
    const output = sut.isValid({ password })

    expect(output).toBe(true)
  })
})
