import Joi from "joi"
import { BadRequestError } from "../../common/utils/apiError.js"

export class UpdateBookCategoryDto {
    constructor() {
        this.schema = Joi.object({
            title: Joi.string()
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