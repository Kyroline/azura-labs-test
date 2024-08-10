import { BookCategoryController } from "./book-category.controller.js";

export class BookCategoryRoute {
    constructor() {
        this.bookCategoryController = new BookCategoryController()
    }

    bindRoutes(router) {
        router.get('/categories', (req, res, next) => this.bookCategoryController.findAll(req, res, next))
        router.get('/categories/:id', (req, res, next) => this.bookCategoryController.find(req, res, next))
        router.post('/categories', (req, res, next) => this.bookCategoryController.create(req, res, next))
        router.patch('/categories/:id', (req, res, next) => this.bookCategoryController.update(req, res, next))
        router.delete('/categories/:id', (req, res, next) => this.bookCategoryController.delete(req, res, next))
    }
}