import cors from 'cors'
import express from 'express'
import setupRoutes from './routes'
import setupSwagger from './swagger'

const app = express()

app.use(express.json())
app.use(cors())
setupSwagger(app)
setupRoutes(app)

export default app