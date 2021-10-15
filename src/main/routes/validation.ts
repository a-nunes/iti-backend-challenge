import { Router } from 'express'

export default (router: Router) => {
  router.get('/validation', (req, res) => {
    res.send('hello world')
  })
}
