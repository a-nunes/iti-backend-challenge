import { ValidationController } from '@/application/controllers'
import { RequiredFieldError } from '@/application/errors'

describe('ValidationController', () => {
  let validation: jest.Mock
  let sut: ValidationController

  beforeAll(() => {
    validation = jest.fn()
    validation.mockReturnValue(true)
  })

  beforeEach(() => {
    sut = new ValidationController(validation)
  })

  it('should return 400 if httpRequest is undefined', async () => {
    const httpResponse = await sut.handle({ password: undefined })

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.data).toEqual(new RequiredFieldError('password'))
  })

  it('should return 400 if httpRequest is null', async () => {
    const httpResponse = await sut.handle({ password: null })

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.data).toEqual(new RequiredFieldError('password'))
  })

  it('should return 200 if called with correct input', async () => {
    const httpResponse = await sut.handle({ password: 'validPassword' })

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.data).toBe(true)
  })

  it('should return 200 and data false if validator fails', async () => {
    validation.mockReturnValueOnce(false)

    const httpResponse = await sut.handle({ password: 'invalid_password' })

    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.data).toBe(false)
  })
})
