
export const zodValidator = (schema) => (req, res, next) => {
    try {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const formatted = result.error.format();
            console.log('Zod validation errors:', formatted);
            const formatedKeys = Object.keys(formatted).filter(key => key !== '_errors');

            return res.status(400).json({
                success: false,
                // formattedErrors: formatted,
                message: 'Validation Error',
                errors: formatedKeys.map((key) => ({
                    [key]: formatted[key],
                    message: formatted[key]._errors[0] || 'Invalid input value',
                }))
            });
        }

        req.validatedData = result.data;

        next();

    } catch (error) {
        next(error);
    }
};