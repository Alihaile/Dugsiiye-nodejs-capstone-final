
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import express from 'express';
import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT || 3000;
import { errorHandler } from './middlewares/errorHandler.js';
import { notFound } from './middlewares/notFound.js';
import routes from './routes/routes.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './util/swagger.js';
import { apiThrotle } from './middlewares/throtle.js';

app.use(helmet({ hidePoweredBy: true }));
app.use(morgan('dev'));
app.use(cors({
    origin: [process.env.FRONTEND_URL, process.env.BACKEND_URL, process.env.BACKEND_URL_PROD],
}));
app.use(express.json());
app.use(apiThrotle);


app.use('/api', routes);
//set up swagger
app.use('/docs', (req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        // FIX: Added the missing bookstore domain right alongside your capstone URL
        "default-src 'self'; connect-src 'self' https://dugsiiye-nodejs-capstone-final.onrender.com https://bookstore-api-aliha.onrender.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
    );
    next();
}, swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(notFound);
app.use(errorHandler);

// connect database:
const MONGODB_URI =
    process.env.NODE_ENV === 'production'
        ? process.env.MONGODB_URI_PROD
        : process.env.MONGO_URI;

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Error connecting to MongoDB:', err);
        process.exit(1);
    });
    
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});