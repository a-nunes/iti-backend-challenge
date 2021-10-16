import { adaptExpressRouter } from '@/main/adapters'
import { Controller } from '@/application/controllers'

import { mock, MockProxy } from 'jest-mock-extended'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { RequestHandler, Response, Request, NextFunction } from 'express'

describe('ExpressRouterAdapter', () => {
  let req: Request
  let res: Response
  let next: NextFunction
  let controller: MockProxy<Controller>
  let sut: RequestHandler

  beforeAll(() => {
    req = getMockReq({ body: { data: 'any_req_data' } })
    res = getMockRes().res
    next = getMockRes().next
    controller = mock()
    controller.handle.mockResolvedValue({
      statusCode: 200,
      data: 'any_res_data'
    })
  })

  beforeEach(() => {
    sut = adaptExpressRouter(controller)
  })

  it('should call handle with correct params', async () => {
    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({ data: 'any_req_data' })
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('should return 200 on success', async () => {
    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith('any_res_data')
    expect(res.send).toHaveBeenCalledTimes(1)
  })

  it('should respond error statusCode and error message on fail', async () => {
    controller.handle.mockResolvedValueOnce({ statusCode: 400, data: new Error('any_error') })

    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.send).toHaveBeenCalledWith('any_error')
    expect(res.send).toHaveBeenCalledTimes(1)
  })
})
