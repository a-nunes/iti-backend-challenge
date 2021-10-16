import { Controller } from '@/application/controllers'

import { mock, MockProxy } from 'jest-mock-extended'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { RequestHandler, Response, Request, NextFunction } from 'express'

export const adaptExpressRouter = (controller: Controller): RequestHandler => {
  return async (req, res) => {
    const { statusCode, data } = await controller.handle({ ...req.body })
    if (statusCode === 200) {
      res.status(200).send(data)
    }
  }
}

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
})
