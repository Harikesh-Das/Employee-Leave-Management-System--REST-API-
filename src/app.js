import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { ExpressValidator } from 'express-validator';


import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/notFound.js';

const app=express();


app.use(helmet());
app.use(cors());
app.use(morgan());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const limiter= rateLimit({
    windowMs:15*60*1000,
    max:100,
    message: "Too many requests please try later"
});
app.use('/api',limiter);


app.use(errorHandler);
app.use(notFound);

module.exports= app;