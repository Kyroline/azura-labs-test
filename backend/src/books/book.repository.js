import { Types } from "mongoose";
import { filterByCategories, filterByDate, filterBySearch, groupAndCountField, paginate, populate, sort } from "./book.aggregation.js";
import { Book } from "./schemas/book.schema.js";

export class BookRepository {
    constructor() {
        this.bookModel = Book
    }

    async findAll(filters) {

        let filter = []

        if (filters?.category)
            filter.push(...filterByCategories(filters?.category))

        if (filters?.q)
            filter.push(...filterBySearch(filters?.q))

        if (filters?.start)
            filter.push(...filterByDate(new Date(filters?.start), null))

        if (filters?.end)
            filter.push(...filterByDate(null, new Date(filters?.end)))

        return this.bookModel.aggregate([
            ...filter,
            ...populate(),
            ...paginate(undefined, 15)
        ]).exec()
    }

    async findById(id) {
        return this.bookModel.aggregate([
            { $match: { _id: new Types.ObjectId(id) } },
            ...populate()
        ]).exec().then(res => res[0])
    }

    async store(title, author, publication_date, publisher, num_pages, categories, cover) {
        return this.bookModel.create([{
            title,
            author,
            publication_date,
            publisher,
            num_pages,
            categories,
            cover
        }]).then(res => res[0])
    }

    async update(id, updateQuery, session) {
        return this.bookModel.findOneAndUpdate({ _id: id }, updateQuery, { session, returnOriginal: true }).exec()
    }

    async delete(id, session) {
        return this.bookModel.findOneAndDelete({ _id: id }, { session }).exec()
    }

    async deleteMany(filter, session) {
        return this.bookModel.deleteMany(filter, { session }).exec()
    }

    async groupAndCount(field, filter) {
        return this.bookModel.aggregate([
            ...groupAndCountField(field, filter)
        ]).exec()
    }
}