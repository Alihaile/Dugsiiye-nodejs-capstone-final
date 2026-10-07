import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { AppError } from "../util/appError.js";

export const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        throw new AppError('Unauthorized access', 401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        throw new AppError('Invalid or expired token', 401);
    }

}

export const authorize = (...roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new AppError(`Access denied, requires one of [${roles.join(', ')}]`, 403);
        }
        next();
    };
}