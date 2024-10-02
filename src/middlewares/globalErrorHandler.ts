/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { THttpError } from '../types';

export default (
  err: THttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.status(err.statusCode || 500).json(err);
};
