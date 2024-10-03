import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import httpError from './utils/httpError';
import responseMessages from './constants/responseMessages';
import jobRouter from './router/jobs';
import globalErrorHandler from './middlewares/globalErrorHandler';
import config from './config';

const app: Application = express();

app.use(
  cors({
    origin: config.ORIGIN
  })
);

// middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '../', 'public')));

// Routes
app.use('/api/v1/jobs', jobRouter);

// 404 error handler
app.use((req: Request, _res: Response, next: NextFunction) => {
  try {
    throw new Error(responseMessages.NOT_FOUND('route'));
  } catch (error) {
    httpError(next, error, req, 404);
  }
});

// globalErrorHandler
app.use(globalErrorHandler);

export default app;
