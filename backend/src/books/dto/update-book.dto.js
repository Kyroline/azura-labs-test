import Joi from "joi"
import { BadRequestError } from "../../common/utils/apiError.js"

export class UpdateBookDto {
    constructor() {
        this.schema = Joi.object({
            title: Joi.string(),

            author: Joi.string(),

            publication_date: Joi.date(),

            publisher: Joi.string(),

            num_pages: Joi.number()
                .integer(),

            categories: Joi.array(),

            cover: Joi.string()
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