import Joi from "joi"
import { BadRequestError } from "../../common/utils/apiError.js"

export class CreateBookDto {
    constructor() {
        this.schema = Joi.object({
            title: Joi.string()
                .required(),

            author: Joi.string()
                .required(),

            publication_date: Joi.date()
                .required(),

            publisher: Joi.string()
                .required(),

            num_pages: Joi.number()
                .integer()
                .required(),

            categories: Joi.array()
                .required(),

            cover: Joi.optional()
        })
    }

    async validate(requestBody) {
        try {
            return await this.schema.validateAsync(requestBody)
        } catch (error) {
            throw new BadRequestError(error.message)
        }
    }
}