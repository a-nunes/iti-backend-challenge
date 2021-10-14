import './config/module-alias'
import 'dotenv/config'

import { env } from '@/main/config/env'
import 'reflect-metadata'

const http = require('http')
const hostname = '127.0.0.1'
const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World')
})

server.listen(env.port, hostname, () => {
  console.log(`Server running at http://${hostname}:${env.port}/`)
})
