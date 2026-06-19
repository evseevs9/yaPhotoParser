import express, { type Request, type Response } from 'express'

const app = express()
const PORT = 3000

// Пример ручки с параметрами: /greet/:name
app.get('/api/:yaSlug', (req: Request, res: Response) => {
  const { yaSlug } = req.params
  res.send(`Hello!!!, ${yaSlug}!`)
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
