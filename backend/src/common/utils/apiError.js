export class ErrorResponse extends Error {
    constructor(code, message) {
        super(message)
        this.code = code
    }
}

export class BadRequestError extends ErrorResponse {
    constructor(message) {
        super(400, message)
    }
}

export class UnauthorizedError extends ErrorResponse {
    constructor(message) {
        super(401, message)
    }
}

export class ForbiddenError extends ErrorResponse {
    constructor(message) {
        super(403, message)
    }
}

export class NotFoundError extends ErrorResponse {
    constructor(message) {
        super(404, message)
    }
}

export class ConflictError extends ErrorResponse {
    constructor(message) {
        super(409, message)
    }
}