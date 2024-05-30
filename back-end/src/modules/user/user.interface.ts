import { Types } from "mongoose";
import { z } from "zod";
import { countries } from "../../constants";
import { loginSchema, registerSchema } from "./user.validation";

export type User = z.infer<typeof registerSchema> & {
  userId: string;
};

export type LoginPayload = z.infer<typeof loginSchema>;

export type TJwtPayload = {
  userID: string;
  email: string;
  name: string;
};

export type Country = (typeof countries)[number];
