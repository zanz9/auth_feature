class ApiError extends Error {
    status
    errors

    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors)
    }

    static Forbidden(message, errors = []) {
        return new ApiError(403, message, errors)
    }

    static StatusRequest(status, message, errors = []) {
        return new ApiError(status, message, errors)
    }
}

export default ApiError