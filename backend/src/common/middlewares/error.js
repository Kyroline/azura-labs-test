import { ErrorResponse } from "../utils/apiError.js"

export const errorMiddleware = async (err, req, res, next) => {
    if (err instanceof ErrorResponse)
        return res.status(err.code).json({ message: err.message })
    console.log(err)
    return res.status(500).json({ message: err.message })
}