import express from 'express'
import { BookRoute } from './books/book.route.js'
import { connectDB } from './common/database/mongodb.js'
import { errorMiddleware } from './common/middlewares/error.js'

connectDB()

const app = express()

const bookRoute = new BookRoute()

app.use(express.json())

bookRoute.bindRoutes(app)

app.use(errorMiddleware)

export default app