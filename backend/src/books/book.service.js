import { BookCategoryService } from "../book-categories/book-category.service.js"
import { BookRepository } from "./book.repository.js"
import mongoose, { Types } from "mongoose"

import path from 'path'
import { fileURLToPath } from "url"
import { rename } from "fs/promises"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export class BookService {
    constructor() {
        this.bookRepository = new BookRepository()
        this.bookCategoryService = new BookCategoryService()
    }

    async findAll(filters) {
        return await this.bookRepository.findAll(filters)
    }

    async find(id) {
        return await this.bookRepository.findById(id)
    }

    async create(createBookDto) {
        const session = await mongoose.connection.startSession()
        try {
            session.startTransaction()

            let filename = Date.now() + path.extname(createBookDto.cover)
            const tmpPath = path.resolve(__dirname, '../../public', 'uploads', 'tmp', createBookDto.cover)
            const newPath = path.resolve(__dirname, '../../public', 'uploads', filename)

            await rename(tmpPath, newPath)

            await this.bookRepository.store(
                createBookDto.title,
                createBookDto.author,
                createBookDto.publication_date,
                createBookDto.publisher,
                createBookDto.num_pages,
                createBookDto.categories,
                filename
            )
            let categoriesObjectId = createBookDto.categories.map((item) => new Types.ObjectId(item))
            await this.bookCategoryService.incBookCount({ _id: { $in: categoriesObjectId } }, 1, session)

            await session.commitTransaction()
        } catch (error) {
            console.log(error)
            await session.abortTransaction()
            throw error
        } finally {
            session.endSession()
        }
    }

    async update(id, updateBookDto) {
        const session = await mongoose.connection.startSession()
        try {
            session.startTransaction()
            if (updateBookDto.cover) {
                let filename = Date.now() + path.extname(attachment.file)
                const tmpPath = path.resolve(__dirname, '../../public', 'uploads', 'tmp', attachment.file)
                const newPath = path.resolve(__dirname, '../../public', 'uploads', filename)

                await fsPromises.rename(tmpPath, newPath)
                updateBookDto.cover = filename
            }

            const book = await this.bookRepository.update(id, updateBookDto)

            const bookCategoryString = book.categories.map(item => item.toString())
            const leftCategories = bookCategoryString.filter(item => updateBookDto.categories.includes(item))
            const decrementedCategories = bookCategoryString.filter(item => !updateBookDto.categories.includes(item))
            const incrementedCategories = updateBookDto.categories.filter(item => !leftCategories.includes(item))

            const decrementedCategoriesObjectId = decrementedCategories.map(item => new Types.ObjectId(item))
            const incrementedCategoriesObjectId = incrementedCategories.map(item => new Types.ObjectId(item))

            await this.bookCategoryService.incBookCount({ _id: { $in: incrementedCategoriesObjectId } }, 1, session)
            await this.bookCategoryService.incBookCount({ _id: { $in: decrementedCategoriesObjectId } }, -1, session)

            await session.commitTransaction()
        } catch (error) {
            await session.abortTransaction()
            next(error)
        } finally {
            session.endSession()
        }
    }

    async delete(id) {
        const session = await mongoose.connection.startSession()
        try {
            session.startTransaction()

            const deletedBook = await this.bookRepository.delete(id, session)

            await this.bookCategoryService.incBookCount({ _id: { $in: deletedBook.categories } }, -1, session)

            await session.commitTransaction()
        } catch (error) {
            await session.abortTransaction()
            next(error)
        } finally {
            session.endSession()
        }
    }
}