import { NotFoundError } from "../common/utils/apiError.js"
import { BookService } from "./book.service.js"
import { CreateBookDto } from "./dto/create-book.dto.js"
import { UpdateBookDto } from "./dto/update-book.dto.js"

export class BookController {
    constructor() {
        this.bookService = new BookService()
    }

    async findAll(req, res, next) {
        const data = await this.bookService.findAll(req.query)
        return res.json({ data: data, meta: { last: data.slice(-2, -1)[0]?._id, limit: 15 } })
    }

    async find(req, res, next) {
        try {
            const data = await this.bookService.find(req.params.id)
            if (!data)
                throw new NotFoundError('Book ID not found')

            return res.json({ data })
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            const validator = new CreateBookDto()
            const requestBody = await validator.validate(req.body)

            return res.status(201).json({ data: await this.bookService.create(requestBody) })
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const requestBody = await (new UpdateBookDto()).validate(req.body)

            await this.bookService.update(req.params.id, requestBody)
            return res.sendStatus(204)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            await this.bookService.delete(req.params.id)

            return res.sendStatus(204)
        } catch (error) {
            next(error)
        }
    }

    async groupAndCountField(req, res, next) {
        try {
            const result = await this.bookService.groupAndCountField(`$${req.query.field}`, req.query.q)
            return res.json({ data: result })
        } catch (error) {
            next(error)
        }
    }
}