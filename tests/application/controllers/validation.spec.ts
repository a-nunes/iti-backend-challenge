type HttpResponse = {
  statusCode: number,
  data: any
}

export class ValidationController {
  async handle (httpRequest: any): Promise<HttpResponse> {
    return {
      statusCode: 400,
      data: new Error('Bad Request')
    }
  }
}

describe('ValidationController', () => {
  it('should return 400 if httpRequest is undefined', async () => {
    const sut = new ValidationController()

    const httpResponse = await sut.handle({ password: undefined })

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.data).toEqual(new Error('Bad Request'))
  })

  it('should return 400 if httpRequest is null', async () => {
    const sut = new ValidationController()

    const httpResponse = await sut.handle({ password: null })

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.data).toEqual(new Error('Bad Request'))
  })

  it('should return 200 if httpRequest is null', async () => {
    const sut = new ValidationController()

    const httpResponse = await sut.handle({ password: null })

    expect(httpResponse.statusCode).toBe(400)
  })
})
