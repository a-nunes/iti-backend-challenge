import { PasswordValidator } from '@/domain/contracts'

import validator from 'validator'

jest.mock('validator')

export class ValidatorAdapter {
  isValid ({ password }: PasswordValidator.Input): void {
    validator.isStrongPassword(password)
  }
}

describe('ValidatorAdapter', () => {
  let password: string
  let fakeValidator: jest.Mocked<typeof validator>
  let sut: ValidatorAdapter

  beforeAll(() => {
    password = 'anyPassword'
    fakeValidator = validator as jest.Mocked<typeof validator>
  })

  beforeEach(() => {
    sut = new ValidatorAdapter()
  })

  it('should call isStrongPassword with correct params', () => {
    sut.isValid({ password })

    expect(fakeValidator.isStrongPassword).toHaveBeenCalledWith(password)
    expect(fakeValidator.isStrongPassword).toHaveBeenCalledTimes(1)
  })
})
