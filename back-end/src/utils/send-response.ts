import { Response } from 'express';

type Options<T> = {
  status?: number;
  message: string;
  data?: T;
};

export function sendResponse<T>(
  res: Response,
  { status = 200, ...rest }: Options<T>
) {
  return res.status(status).json(rest);
}
