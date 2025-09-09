/* eslint-disable no-console */
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { corsOptions } from '~/config/corsOptions'
import { APIs_V1 } from '~/routes/v1/'

const START_SERVER = () => {
  const app = express()

  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })

  app.use(cookieParser())

  app.use(cors(corsOptions))

  app.use(express.json())

  app.use('/v1', APIs_V1)

  const LOCAL_DEV_APP_PORT = 8018
  const LOCAL_DEV_APP_HOST = 'localhost'
  const AUTHOR = 'ideft'

  if (process.env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      console.log(`Production: Hi ${AUTHOR}, Back-end Server is running successfully at Port: ${process.env.PORT}`)
    })
  } else {
    app.listen(LOCAL_DEV_APP_PORT, LOCAL_DEV_APP_HOST, () => {
      console.log(`Local DEV: Hello ${AUTHOR}, Back-end Server is running successfully at Host: ${LOCAL_DEV_APP_HOST} and Port: ${LOCAL_DEV_APP_PORT}`)
    })
  }
}

(async () => {
  try {
    console.log('Starting Server...')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()
