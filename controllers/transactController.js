
import Transaction from "../models/transaction.js";
import { AppError } from "../util/appError.js";

export const getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find({ userId: req.user._id });
        res.json(transactions);
    } catch (error) {
        next(error);
    }
};

export const addTransaction = async (req, res, next) => {
    try {

        // throw new AppError(JSON.stringify({ ...req.body, userId: req.user._id }), 400);
        const transaction = new Transaction({ ...req.body, userId: req.user._id });
        await transaction.save();

        res.status(201).json(transaction);
    } catch (error) {
        next(error);
    }
};

export const updateTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, { ...req.body, userId: req.user._id }, { new: true });

        res.status(200).json(transaction);
    } catch (error) {
        next(error);
    }
};

export const deleteTransaction = async (req, res, next) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: `Transaction ${transaction._id} deleted successfully`
        });
    } catch (error) {
        next(error);
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Transaction.find().distinct('category');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
}

export const monthlySummary = async (req, res, next) => {
    try {
        const summary = await Transaction.aggregate([
            {
                $group: {
                    _id: {
                        month: {
                            $dateToString: {
                                format: "%Y-%m",
                                date: "$date"
                            }
                        },
                        category: "$category"
                    },
                    income: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "income"] },
                                "$amount",
                                0
                            ]
                        }
                    },

                    expenses: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "expense"] },
                                { $abs: "$amount" },
                                0
                            ]
                        }
                    }
                }
            },

            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    category: "$_id.category",
                    income: 1,
                    expenses: 1,
                    net: {
                        $subtract: ["$income", "$expenses"]
                    }
                }
            },

            {
                $sort: {
                    month: 1,
                    category: 1
                }
            }
        ]);

        res.status(200).json(summary);

    } catch (error) {
        next(error);
    }
};
