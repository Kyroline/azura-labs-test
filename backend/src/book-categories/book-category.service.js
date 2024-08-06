import { BookCategoryRepository } from "./book-category.repository";

export class BookCategoryService {
    constructor() {
        this.bookCategoryRepository = new BookCategoryRepository()
    }
}