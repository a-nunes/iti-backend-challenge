import './config/module-alias'
import 'dotenv/config'
import { env } from '@/main/config/env'
import { app } from '@/main/config/app'

import 'reflect-metadata'

app.post('/', (req, res) => {
  res.send(true)
})
app.listen(env.port, () => {
  console.log(`Server running at http://localhost:${env.port}/`)
})
