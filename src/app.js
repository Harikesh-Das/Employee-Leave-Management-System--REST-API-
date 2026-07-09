import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/notFound.js';
import userRoutes from './routes/index.js';

const app = express();

// Global Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static('public/images'));

//Rate Limiting (100 req per 15 min per IP adress)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try later'
});
app.use('/api', limiter);

//All Routes
app.use("/api",userRoutes);

//Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;