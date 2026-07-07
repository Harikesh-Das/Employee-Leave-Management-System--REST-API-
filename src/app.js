import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/notFound.js';
import userRoutes from './routes/index.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try later'
});
app.use('/api', limiter);

app.use("/api",userRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;