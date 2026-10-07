export class AppError extends Error {
    constructor(message, statusCode, originalError = null) {
        super(message);

        this.statusCode = statusCode;
        this.isOperational = true;

        if (originalError?.stack) {
            this.stack += '\nCaused by:\n' + originalError.stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}