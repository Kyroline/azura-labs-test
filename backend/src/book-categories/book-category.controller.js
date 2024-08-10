import { Types } from "mongoose";
import { BookCategoryService } from "./book-category.service.js";
import { UpdateBookCategoryDto } from "./dto/update-book-category.dto.js";
import { CreateBookCategoryDto } from "./dto/create-book-category.dto.js";

export class BookCategoryController {
    constructor() {
        this.bookCategoryService = new BookCategoryService()
    }

    async findAll(req, res, next) {
        try {
            return res.json({ data: await this.bookCategoryService.findAll() })
        } catch (error) {
            next(error)
        }
    }

    async find(req, res, next) {
        try {
            return res.json({ data: await this.bookCategoryService.find(req.params.id) })
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const validator = new UpdateBookCategoryDto()
            const requestBody = await validator.validate(req.body)
            await this.bookCategoryService.update({ _id: new Types.ObjectId(req.params.id) }, requestBody)
            return res.sendStatus(200)
        } catch (error) {
            next(error)
        }

    }

    async create(req, res, next) {
        try {
            const validator = new CreateBookCategoryDto()
            const requestBody = await validator.validate(req.body)
            await this.bookCategoryService.store(requestBody.title)
            return res.sendStatus(201)
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            await this.bookCategoryService.delete(req.params.id)
        } catch (error) {
            next(error)
        }

        return res.sendStatus(200)
    }
}