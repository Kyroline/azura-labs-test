import express from 'express'
import { BookRoute } from './books/book.route.js'
import { BookCategoryRoute } from './book-categories/book-category.route.js'

import { connectDB } from './common/database/mongodb.js'
import { errorMiddleware } from './common/middlewares/error.js'
import cors from 'cors'
import { StorageRoute } from './storage/storage.route.js'

import path from 'path'
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const bookRoute = new BookRoute()
const bookCategoryRoute = new BookCategoryRoute()
const storageRoute = new StorageRoute()


const publicPath = path.resolve(__dirname, '..', 'public')

connectDB()

const app = express()
app.use(express.static(publicPath))
app.use(cors())
app.use(express.json())

storageRoute.bindRoutes(app)
bookRoute.bindRoutes(app)
bookCategoryRoute.bindRoutes(app)

app.use(errorMiddleware)

export default app