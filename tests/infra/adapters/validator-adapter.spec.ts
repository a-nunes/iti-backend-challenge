
import { ValidatorAdapter } from '@/infra/adapters'

import validator from 'validator'

jest.mock('validator')

describe('ValidatorAdapter', () => {
  let password: string
  let fakeValidator: jest.Mocked<typeof validator>
  let sut: ValidatorAdapter
  let options: object

  beforeAll(() => {
    options = { minLength: 9, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }
    password = 'valid_password'
    fakeValidator = validator as jest.Mocked<typeof validator>
    fakeValidator.isStrongPassword.mockImplementation(() => true)
  })

  beforeEach(() => {
    sut = new ValidatorAdapter()
  })

  it('should call isStrongPassword with correct params', () => {
    sut.isValid({ password })

    expect(fakeValidator.isStrongPassword).toHaveBeenCalledWith(password, options)
    expect(fakeValidator.isStrongPassword).toHaveBeenCalledTimes(1)
  })

  it('should return true on success', () => {
    const output = sut.isValid({ password })

    expect(output).toBe(true)
  })
})
