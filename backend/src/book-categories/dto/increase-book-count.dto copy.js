import Joi from "joi"
import { BadRequestError } from "../../common/utils/apiError.js"

export class IncreaseBookCountDto {
    constructor() {
        this.schema = Joi.object({
            value: Joi.number().required()
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