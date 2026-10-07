import jwt from 'jsonwebtoken';

export const generateJWT = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}