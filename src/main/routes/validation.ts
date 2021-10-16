import { adaptExpressRouter as adapt } from '@/main/adapters'
import { makeValidationController } from '@/main/factories/controllers'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/validation', adapt(makeValidationController()))
}
