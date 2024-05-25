import { env } from "../config";
import { Response } from "express";

export function setCookie(res: Response, token: string) {
  res.cookie("token", `Bearer ${token}`, {
    httpOnly: true,
    secure: !env.isDev,
  });
}
