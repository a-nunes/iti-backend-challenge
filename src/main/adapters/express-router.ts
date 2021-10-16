import { Controller } from '@/application/controllers'

import { RequestHandler } from 'express'

export const adaptExpressRouter = (controller: Controller): RequestHandler => {
  return async (req, res) => {
    const { statusCode, data } = await controller.handle({ ...req.body })
    if (statusCode === 200) {
      res.status(200).send(data)
    } else {
      res.status(statusCode).send(data.message)
    }
  }
}
