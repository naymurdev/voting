import { Response, Request, NextFunction } from "express";
import { env } from "../config";
import { TJwtPayload } from "../modules/user/user.interface";
import { AppError, catchAsync } from "../utils";
import jwt from "jsonwebtoken";

export const verifyToken = catchAsync(
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const bearerHeader: string =
        req.headers.authorization || req.body.headers.Authorization;

      console.log(bearerHeader);

      if (!bearerHeader || !bearerHeader.startsWith("Bearer"))
        throw new Error();

      // Extract the token by removing the "Bearer " prefix
      const token = bearerHeader.split(" ")[1];

      jwt.verify(token, env.JWT_SECRET, (err, decoded) => {
        if (err) throw err;

        req.jwtPayload = decoded as TJwtPayload;

        next();
      });
    } catch (err) {
      throw new AppError(401, "Unauthorized access.");
    }
  }
);
