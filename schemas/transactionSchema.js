import { z } from 'zod';

export const transactionSchema = z.object({
    // userId: z.string().nonempty('User ID is required'),
    title: z.string().nonempty('Title is required')
        .min(3, 'Title must be at least 3 characters long')
        .max(50, 'Title must be at most 50 characters long'),
    type: z.enum(['income', 'expense'], { message: 'Type must be either income or expense' }),
    amount: z.number('Amount must be a number').nonoptional('Amount is required'),
    category: z.string().nonempty('Category is required')
        .min(3, 'Category must be at least 3 characters long')
        .max(30, 'Category must be at most 30 characters long'),
    date: z.coerce.date({ invalid_type_error: 'date must be a valid date' }).default(() => new Date())
});