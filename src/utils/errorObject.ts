import { Request } from 'express';
import { THttpError } from '../types';
import responseMessages from '../constants/responseMessages';
import config from '../config';
import { EApplicationEnvironment } from '../constants/application';

export default (
  err: Error | unknown,
  req: Request,
  errorStatusCode = 500
): THttpError => {
  const errorObj: THttpError = {
    success: false,
    statusCode: errorStatusCode,
    request: {
      ip: req.ip || null,
      method: req.method,
      url: req.originalUrl
    },
    message:
      err instanceof Error
        ? err.message || responseMessages.SOMETHING_WENT_WRONG
        : responseMessages.SOMETHING_WENT_WRONG,
    data: null,
    trace: err instanceof Error ? { error: err.stack } : null
  };

  // logger
  //   console.error('CONTROLLER_ERROR', {
  //     meta: errorObj
  //   });

  //   Production ENV check
  if (config.ENV === EApplicationEnvironment.PRODUCTION) {
    delete errorObj.request.ip;
    delete errorObj.trace;
  }

  return errorObj;
};
