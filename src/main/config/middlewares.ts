import express, { Express } from 'express'
import cors from 'cors'

export const setupMiddlewares = (app: Express) => {
  app.use(express.json())
  app.use(cors())
}
