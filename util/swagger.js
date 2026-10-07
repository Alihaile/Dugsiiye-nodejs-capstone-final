
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Finance Tracker API',
            version: '1.0.0',
            description: 'Comprehensive API documentation for managing user authentication, transactions, analysis, and file uploads.',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Transactions API Documentation',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'Enter your JWT token in the format: Bearer <token>',
                },
            },
        },
    },
    // Adjust paths to match where your route files live
    apis: ['./routes/*.js'],
};

export const swaggerDocs = swaggerJsdoc(swaggerOptions);

