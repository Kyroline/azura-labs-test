import { BookRepository } from "./book.repository.js"

export class BookService {
    constructor() {
        this.bookRepository = new BookRepository
    }

    async findAll(filters) {
        return await this.bookRepository.findAll(filters)
    }

    async find(id) {
        return await this.bookRepository.findById(id)
    }

    async create(createBookDto) {
        return this.bookRepository.store(
            createBookDto.title, 
            createBookDto.author, 
            createBookDto.publication_date, 
            createBookDto.publisher, 
            createBookDto.num_pages, 
            createBookDto.categories
        )
    }

    async update(id, updateBookDto) {
        await this.bookRepository.update(id, updateBookDto)
    }

    async delete(id) {
        await this.bookRepository.delete(id)
    }
}