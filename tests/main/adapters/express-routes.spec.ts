import { Controller } from '@/application/controllers'

import { mock } from 'jest-mock-extended'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { RequestHandler } from 'express'

export const adaptExpressRouter = (controller: Controller): RequestHandler => {
  return (req, res) => {
    controller.handle({ ...req.body })
  }
}

describe('ExpressRouterAdapter', () => {
  it('should call handle with correct params', async () => {
    const req = getMockReq({ body: { data: 'any_data' } })
    const res = getMockRes().res
    const next = getMockRes().next
    const controller = mock<Controller>()

    const sut = adaptExpressRouter(controller)

    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({ data: 'any_data' })
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })
})
