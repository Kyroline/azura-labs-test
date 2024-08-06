import { filterByCategories, filterBySearch } from "./book.aggregation.js";
import { Book } from "./schemas/book.schema.js";

export class BookRepository {
    constructor() {
        this.bookModel = Book
    }

    async findAll(filters) {

        if (filters?.category)
            return this.bookModel.aggregate([
                ...filterByCategories(filters?.category)
            ]).exec()

        if (filters?.q)
            return this.bookModel.aggregate([
                ...filterBySearch(filters?.q)
            ]).exec()

        if (filters?.startDate || filters?.endDate)
            return this.bookModel.aggregate([
            ])

        return this.bookModel.find({}).exec()
    }

    async findById(id) {
        return this.bookModel.findOne({ _id: id }).exec()
    }

    async store(title, author, publication_date, publisher, num_pages, categories) {
        return this.bookModel.create([{
            title,
            author,
            publication_date,
            publisher,
            num_pages,
            categories
        }]).then(res => res[0])
    }

    async update(id, updateQuery) {
        return this.bookModel.updateOne({ _id: id }, updateQuery).exec()
    }

    async delete(id) {
        return this.bookModel.deleteOne({ _id: id }).exec()
    }
}