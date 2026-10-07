
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
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(notFound);
app.use(errorHandler);

// connect database:
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('✅ Connected to MongoDB');
}).catch((err) => {
    console.error('❌ Error connecting to MongoDB:', err);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});