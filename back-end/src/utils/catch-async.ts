import { NextFunction, Request, RequestHandler, Response } from 'express';

type ReqBody = Record<string, unknown>;

export function catchAsync<T extends ReqBody>(
  fn: RequestHandler<Record<string, string>, {}, T>
) {
  return (
    req: Request<Record<string, string>, {}, T>,
    res: Response,
    next: NextFunction
  ) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
}
