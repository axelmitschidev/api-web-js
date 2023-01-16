import * as dotenv from 'dotenv'
import express from 'express'

import v1router from './v1/routes/index.js'

dotenv.config()

const PORT = process.env.API_PORT || 3000

const app = express()

app.use(express.json())

app.use('/api/v1', v1router)

app.listen(PORT, () => {
  console.log(`API listen on http://localhost:${PORT}`)
})
