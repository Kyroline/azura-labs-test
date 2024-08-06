import Joi from "joi"

export class UpdateBookDto {
    constructor() {
        this.schema = Joi.object({
            title: Joi.string()
                .alphanum(),

            author: Joi.string()
                .required(),

            publication_date: Joi.date(),

            publisher: Joi.string(),

            num_pages: Joi.number()
                .integer(),

            categories: Joi.array()
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