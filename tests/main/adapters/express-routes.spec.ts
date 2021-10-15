import { Controller } from '@/application/controllers'

import { mock, MockProxy } from 'jest-mock-extended'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { RequestHandler, Response, Request, NextFunction } from 'express'

export const adaptExpressRouter = (controller: Controller): RequestHandler => {
  return (req, res) => {
    controller.handle({ ...req.body })
  }
}

describe('ExpressRouterAdapter', () => {
  let req: Request
  let res: Response
  let next: NextFunction
  let controller: MockProxy<Controller>
  let sut: RequestHandler

  beforeAll(() => {
    req = getMockReq({ body: { data: 'any_data' } })
    res = getMockRes().res
    next = getMockRes().next
    controller = mock()
  })

  beforeEach(() => {
    sut = adaptExpressRouter(controller)
  })

  it('should call handle with correct params', async () => {
    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({ data: 'any_data' })
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })
})
