import mongoose, { Types } from "mongoose";
import { BookRepository } from "../books/book.repository.js";
import { BookCategoryRepository } from "./book-category.repository.js";

export class BookCategoryService {
    constructor() {
        this.bookCategoryRepository = new BookCategoryRepository()
        this.bookRepository = new BookRepository()
    }

    async findAll() {
        return this.bookCategoryRepository.findAll()
    }

    async find(id) {
        return this.bookCategoryRepository.findById(id)
    }

    async store(title) {
        return this.bookCategoryRepository.store(title)
    }

    async update(filter, query) {
        return this.bookCategoryRepository.update(filter, query)
    }

    async delete(id) {
        const session = await mongoose.connection.startSession()
        try {
            session.startTransaction()
            await this.bookRepository.deleteMany({ categories: { $in: [new Types.ObjectId(id)] } }, session)
            await this.bookCategoryRepository.delete(id, session)

            await session.commitTransaction()
        } catch (error) {
            await session.abortTransaction()
            next(error)
        } finally {
            session.endSession()
        }
    }

    async incBookCount(filter, value, session) {
        return this.bookCategoryRepository.incBookCount(filter, value, session)
    }
}