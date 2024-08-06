// import app from "./src/app.js";
import express from 'express'
import { BookRoute } from './src/books/book.route.js'
import { connectDB } from './src/common/database/mongodb.js'
import { errorMiddleware } from './src/common/middlewares/error.js'

connectDB()

const app = express()

const bookRoute = new BookRoute()

app.use(express.json())

bookRoute.bindRoutes(app)

app.get('/', (req, res) => {res.json({ message: "AAAA"})})

app.use(errorMiddleware)

app.listen(3000, () => {
    console.log(`App Running on Port ${3000}`)
})