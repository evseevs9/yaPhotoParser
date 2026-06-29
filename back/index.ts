import express, { type Request, type Response } from 'express'
const cors = require('cors')
const winston = require('winston')
import headers from './headers'
import getModifiedRestData from './getModifiedRestData'

const app = express()
const PORT = 3000

interface LogInfo {
  timestamp: string
  level: string
  message: string
  [key: string]: any
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf((info: LogInfo) => {
      const { timestamp, level, message } = info
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`
    })
  ),
  transports: [new winston.transports.File({ filename: 'app.log' })],
})

app.use((req, res, next) => {
  const startTime = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - startTime
    logger.info(
      `${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`
    )
  })

  next()
})

app.use(
  cors({
    origin: 'https://yaphotoparser.evseevs9.ru/',
  })
)

app.get('/api/:yaSlug', (req: Request, res: Response) => {
  const { yaSlug } = req.params

  fetch(`https://eda.yandex.ru/api/v2/menu/retrieve/${yaSlug}`, {
    headers: headers,
    credentials: 'include',
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 404) {
          res.status(404).json({
            success: false,
            message: 'Resource not found for slug: ' + yaSlug,
          })
        }
        throw new Error('Network response was not ok ' + response.status)
      }
      return response.json()
    })
    .then((data) => {
      const restData = getModifiedRestData(data)
      res.send(restData)
    })
    .catch((error) => {
      logger.error(`Ошибка: ${error.message}, slug: ${yaSlug}`)
    })
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
