import { BookController } from "./book.controller.js";

export class BookRoute {
    constructor() {
        this.bookController = new BookController()
    }

    bindRoutes(router) {
        router.get('/books/fields', (req, res, next) => this.bookController.groupAndCountField(req, res, next))
        router.get('/books', (req, res, next) => this.bookController.findAll(req, res, next))
        router.get('/books/:id', (req, res, next) => this.bookController.find(req, res, next))
        router.post('/books', (req, res, next) => this.bookController.create(req, res, next))
        router.patch('/books/:id', (req, res, next) => this.bookController.update(req, res, next))
        router.delete('/books/:id', (req, res, next) => this.bookController.delete(req, res, next))
    }
}