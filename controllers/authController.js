import User from '../models/user.js';
import { AppError } from '../util/appError.js';
import { generateJWT } from '../util/generateJWT.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateJWT(user);
    res.status(200).json({ token });
}

export const register = async (req, res) => {
    try {
        const { name, email, role, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ name, email, role, password });
        await user.save();
        const token = generateJWT(user);
        res.status(201).json({ token });

    } catch (error) {

        throw new AppError(
            `Error registering user: ${error.message}`,
            500,
            error
        );
    }

}

export const getProfileInfo = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.status(200).json({ user });
    } catch (error) {
        throw new AppError('Error fetching profile info', 500);
    }
}

export const overview = async (req, res) => {
    try {
        res.status(200).json({ message: 'Welcome to the admin overview' });
    } catch (error) {
        throw new AppError('Error accessing overview', 500);
    }
}