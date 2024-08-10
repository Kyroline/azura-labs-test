import { Types } from "mongoose";
import { BookCategory } from "./schemas/book-category.schema.js";

export class BookCategoryRepository {
    constructor() {
        this.bookCategorySchema = BookCategory
    }

    async findAll(session) {
        return this.bookCategorySchema.find({}, {}, { session }).exec()
    }

    async findById(id, session) {
        return this.bookCategorySchema.findOne({ _id: new Types.ObjectId(id) }, {}, { session }).exec()
    }

    async store(title, session) {
        return this.bookCategorySchema.create([{ title }], { session })
    }

    async update(filter, query, session) {
        return this.bookCategorySchema.updateMany(filter, query, { session }).exec()
    }

    async delete(id, session) {
        return this.bookCategorySchema.deleteMany({ _id: new Types.ObjectId(id) }, { session }).exec()
    }

    async incBookCount(filter, value, session) {
        return this.bookCategorySchema.updateMany(filter, { $inc: { book_count: value } }, { session }).exec()
    }
}