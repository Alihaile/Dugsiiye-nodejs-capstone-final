import { AppError } from "../util/appError.js";

export const notFound = (req, res, next) => {
    const error = new AppError(`Resource ${req.originalUrl} not found`, 404);

    next(error);

    // res.status(error.statusCode).json({
    //     success: false,
    //     message: error.message,
    //     status: error.statusCode
    // });
};